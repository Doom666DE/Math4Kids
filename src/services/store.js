import { getSupabaseClient, hasSupabaseConfig } from "./supabaseClient.js";

const STORAGE_KEY = "math4kids-demo-v1";

export function createMath4KidsStore() {
  return hasSupabaseConfig() ? createSupabaseStore() : createDemoStore();
}

function createSupabaseStore() {
  return {
    isSupabaseEnabled: true,
    async getSession() {
      const supabase = await getSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) return null;
      return profileSession(supabase, data.session.user);
    },
    async signUp({ email, password, role }) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      });
      if (error) throw error;
      return { id: data.user?.id ?? email, email, role };
    },
    async signIn({ email, password }) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return profileSession(supabase, data.user);
    },
    async signOut() {
      const supabase = await getSupabaseClient();
      await supabase.auth.signOut();
    },
    async listChildren() {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.from("child_profiles").select("id,name,grade,avatar,created_at").order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    async createChildProfile({ name, grade, pin, avatar }) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.rpc("create_child_profile_with_pin", {
        child_name: name,
        child_grade: grade,
        child_avatar: avatar,
        raw_pin: pin,
      });
      if (error) throw error;
      return Array.isArray(data) ? data[0] : data;
    },
    async verifyChildPin(childId, pin) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.rpc("verify_child_pin", {
        child_id: childId,
        raw_pin: pin,
      });
      if (error) throw error;
      if (!data) throw new Error("PIN ist nicht korrekt.");
      return true;
    },
    async listAttempts(childId) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("attempts")
        .select("*")
        .eq("child_id", childId)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data ?? [];
    },
    async listMissionProgress(childId) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("mission_progress")
        .select("*")
        .eq("child_id", childId)
        .order("last_activity_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    async recordAttempt(childId, attempt) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("attempts")
        .insert({ child_id: childId, ...attempt })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    async upsertMissionProgress(childId, progress) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("mission_progress")
        .upsert({ child_id: childId, ...progress }, { onConflict: "child_id,mission_id" })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    async listClasses() {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("class_rooms")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    async createClassRoom({ name, grade, schoolYear }) {
      const supabase = await getSupabaseClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const { data, error } = await supabase
        .from("class_rooms")
        .insert({ teacher_id: userData.user.id, name, grade, school_year: schoolYear })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    async assignChildToClass(classId, childId) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("class_memberships")
        .upsert({ class_id: classId, child_id: childId, status: "active" }, { onConflict: "class_id,child_id" })
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    async listClassChildren(classId) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase
        .from("class_memberships")
        .select("id,status,created_at,child:child_profiles(id,name,grade,avatar,created_at)")
        .eq("class_id", classId)
        .eq("status", "active")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((membership) => ({ ...membership.child, membership_id: membership.id, membership_status: membership.status }));
    },
    async listClassAttempts(classId, filters = {}) {
      const children = await this.listClassChildren(classId);
      if (!children.length) return [];
      const childMap = new Map(children.map((child) => [child.id, child]));
      const supabase = await getSupabaseClient();
      let query = supabase
        .from("attempts")
        .select("*")
        .in("child_id", children.map((child) => child.id))
        .order("created_at", { ascending: false })
        .limit(500);
      if (filters.childId) query = query.eq("child_id", filters.childId);
      if (filters.moduleId) query = query.eq("module_id", filters.moduleId);
      if (filters.result === "correct") query = query.eq("is_correct", true);
      if (filters.result === "wrong") query = query.eq("is_correct", false);
      if (filters.errorType) query = query.eq("error_type", filters.errorType);
      const since = dateRangeStart(filters.dateRange);
      if (since) query = query.gte("created_at", since.toISOString());
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []).map((attempt) => ({ ...attempt, child: childMap.get(attempt.child_id) ?? null }));
    },
  };
}

async function profileSession(supabase, user) {
  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  return {
    id: user.id,
    email: user.email,
    role: data?.role ?? user.user_metadata?.role ?? "parent",
  };
}

export function createDemoStore() {
  const read = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? JSON.parse(raw) : {};
    return {
      session: null,
      accounts: [],
      children: [],
      attempts: [],
      missionProgress: [],
      classRooms: [],
      classMemberships: [],
      ...state,
    };
  };
  const write = (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  return {
    isSupabaseEnabled: false,
    async getSession() {
      return read().session;
    },
    async signUp({ email, role = "parent" }) {
      const state = read();
      const existing = state.accounts.find((account) => account.email === email);
      const account = existing ?? { id: `demo-user-${Date.now()}`, email, role };
      if (!existing) state.accounts.push(account);
      state.session = { id: account.id, email, role: account.role };
      write(state);
      return state.session;
    },
    async signIn({ email }) {
      const state = read();
      const account = state.accounts.find((item) => item.email === email) ?? { id: "demo-user", email, role: "parent" };
      if (!state.accounts.some((item) => item.email === email)) state.accounts.push(account);
      state.session = { id: account.id, email, role: account.role };
      write(state);
      return state.session;
    },
    async signOut() {
      const state = read();
      state.session = null;
      write(state);
    },
    async listChildren() {
      return read().children;
    },
    async createChildProfile({ name, grade, pin, avatar }) {
      if (!/^\d{4,8}$/.test(pin)) throw new Error("Die PIN braucht 4 bis 8 Ziffern.");
      const state = read();
      const child = {
        id: `child-${Date.now()}`,
        name,
        grade,
        avatar,
        pin,
        created_at: new Date().toISOString(),
      };
      state.children.push(child);
      write(state);
      return child;
    },
    async verifyChildPin(childId, pin) {
      const child = read().children.find((item) => item.id === childId);
      if (!child || child.pin !== pin) throw new Error("PIN ist nicht korrekt.");
      return true;
    },
    async listAttempts(childId) {
      return read().attempts.filter((attempt) => attempt.child_id === childId).sort((a, b) => b.created_at.localeCompare(a.created_at));
    },
    async listMissionProgress(childId) {
      return read()
        .missionProgress?.filter((progress) => progress.child_id === childId)
        .sort((a, b) => b.last_activity_at.localeCompare(a.last_activity_at)) ?? [];
    },
    async recordAttempt(childId, attempt) {
      const state = read();
      const saved = {
        id: `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        child_id: childId,
        created_at: new Date().toISOString(),
        ...attempt,
      };
      state.attempts.unshift(saved);
      write(state);
      return saved;
    },
    async upsertMissionProgress(childId, progress) {
      const state = read();
      state.missionProgress = state.missionProgress ?? [];
      const index = state.missionProgress.findIndex((item) => item.child_id === childId && item.mission_id === progress.mission_id);
      const saved = {
        id: index >= 0 ? state.missionProgress[index].id : `progress-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        child_id: childId,
        ...progress,
      };
      if (index >= 0) {
        state.missionProgress[index] = saved;
      } else {
        state.missionProgress.push(saved);
      }
      write(state);
      return saved;
    },
    async listClasses() {
      const state = read();
      return state.classRooms.filter((classRoom) => classRoom.teacher_id === state.session?.id);
    },
    async createClassRoom({ name, grade, schoolYear }) {
      const state = read();
      const created = {
        id: `class-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        teacher_id: state.session?.id ?? "demo-user",
        name,
        grade: Number(grade),
        school_year: schoolYear,
        created_at: new Date().toISOString(),
      };
      state.classRooms.push(created);
      write(state);
      return created;
    },
    async assignChildToClass(classId, childId) {
      const state = read();
      const existing = state.classMemberships.find((item) => item.class_id === classId && item.child_id === childId);
      const membership = existing ?? {
        id: `membership-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        class_id: classId,
        child_id: childId,
        status: "active",
        created_at: new Date().toISOString(),
      };
      if (existing) {
        existing.status = "active";
      } else {
        state.classMemberships.push(membership);
      }
      write(state);
      return membership;
    },
    async listClassChildren(classId) {
      const state = read();
      const childIds = new Set(state.classMemberships.filter((item) => item.class_id === classId && item.status === "active").map((item) => item.child_id));
      return state.children.filter((child) => childIds.has(child.id));
    },
    async listClassAttempts(classId, filters = {}) {
      const state = read();
      const childMap = new Map(state.children.map((child) => [child.id, child]));
      const childIds = new Set(state.classMemberships.filter((item) => item.class_id === classId && item.status === "active").map((item) => item.child_id));
      return state.attempts
        .filter((attempt) => childIds.has(attempt.child_id))
        .filter((attempt) => !filters.childId || attempt.child_id === filters.childId)
        .filter((attempt) => !filters.moduleId || attempt.module_id === filters.moduleId)
        .filter((attempt) => filters.result !== "correct" || attempt.is_correct)
        .filter((attempt) => filters.result !== "wrong" || !attempt.is_correct)
        .filter((attempt) => !filters.errorType || attempt.error_type === filters.errorType)
        .filter((attempt) => {
          const since = dateRangeStart(filters.dateRange);
          return !since || new Date(attempt.created_at) >= since;
        })
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map((attempt) => ({ ...attempt, child: childMap.get(attempt.child_id) ?? null }));
    },
  };
}

function dateRangeStart(dateRange) {
  const now = new Date();
  if (dateRange === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (dateRange === "7d") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  if (dateRange === "30d") {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  return null;
}
