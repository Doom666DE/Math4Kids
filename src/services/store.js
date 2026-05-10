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
      return data.session?.user ? { id: data.session.user.id, email: data.session.user.email } : null;
    },
    async signUp({ email, password, role }) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      });
      if (error) throw error;
      return { id: data.user?.id ?? email, email };
    },
    async signIn({ email, password }) {
      const supabase = await getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { id: data.user.id, email: data.user.email };
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
  };
}

function createDemoStore() {
  const read = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { session: null, children: [], attempts: [] };
  };
  const write = (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  return {
    isSupabaseEnabled: false,
    async getSession() {
      return read().session;
    },
    async signUp({ email }) {
      const state = read();
      state.session = { id: "demo-user", email };
      write(state);
      return state.session;
    },
    async signIn({ email }) {
      const state = read();
      state.session = { id: "demo-user", email };
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
  };
}
