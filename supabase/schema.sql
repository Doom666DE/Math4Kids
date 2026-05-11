create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('parent', 'teacher')),
  created_at timestamptz not null default now()
);

create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  grade int not null check (grade between 1 and 10),
  avatar text not null default '⭐',
  pin_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id text primary key,
  title text not null,
  description text not null default '',
  visual text not null default '•',
  color text not null default '#18a999',
  grade_min int not null check (grade_min between 1 and 10),
  grade_max int not null check (grade_max between 1 and 10),
  sort_order int not null
);

create table if not exists public.topics (
  id text primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  module_id text not null,
  title text not null,
  grade_min int not null check (grade_min between 1 and 10),
  grade_max int not null check (grade_max between 1 and 10)
);

create table if not exists public.skills (
  id text primary key,
  module_id text not null,
  title text not null,
  grade_min int not null check (grade_min between 1 and 10),
  grade_max int not null check (grade_max between 1 and 10),
  description text not null default ''
);

alter table public.skills add column if not exists subject_id text references public.subjects(id);
alter table public.skills add column if not exists topic_id text references public.topics(id);

create table if not exists public.missions (
  id text primary key,
  module_id text not null,
  title text not null,
  description text not null,
  badge text not null,
  visual text not null,
  grade_min int not null check (grade_min between 1 and 10),
  grade_max int not null check (grade_max between 1 and 10),
  target_count int not null default 6 check (target_count > 0),
  sort_order int not null
);

alter table public.missions add column if not exists subject_id text references public.subjects(id);

create table if not exists public.task_templates (
  id text primary key,
  subject_id text not null references public.subjects(id) on delete cascade,
  topic_id text references public.topics(id) on delete set null,
  module_id text not null,
  skill_id text not null,
  title text not null,
  answer_type text not null,
  grade_min int not null check (grade_min between 1 and 10),
  grade_max int not null check (grade_max between 1 and 10),
  quality_rules jsonb not null default '{}'::jsonb,
  sort_order int not null default 0
);

create table if not exists public.generated_tasks (
  id uuid primary key default gen_random_uuid(),
  template_id text not null references public.task_templates(id) on delete cascade,
  subject_id text not null references public.subjects(id) on delete cascade,
  topic_id text references public.topics(id) on delete set null,
  module_id text not null,
  skill_id text not null,
  prompt text not null,
  expected_answer text not null,
  explanation text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  module_id text not null,
  skill_id text not null,
  question_type text not null,
  prompt text not null,
  expected_answer text not null,
  given_answer text not null,
  is_correct boolean not null,
  duration_ms int not null default 0,
  error_type text,
  explanation text,
  grade_level text not null,
  test_id text,
  created_at timestamptz not null default now()
);

alter table public.attempts add column if not exists mission_id text references public.missions(id);
alter table public.attempts add column if not exists subject_id text references public.subjects(id);
alter table public.attempts add column if not exists topic_id text references public.topics(id);
alter table public.attempts add column if not exists template_id text references public.task_templates(id);
alter table public.attempts add column if not exists answer_type text;
alter table public.attempts add column if not exists level int check (level is null or level between 1 and 10);
alter table public.attempts add column if not exists hint_count int not null default 0 check (hint_count >= 0);
alter table public.attempts add column if not exists stars_awarded int not null default 0 check (stars_awarded between 0 and 3);

create table if not exists public.mission_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  mission_id text not null references public.missions(id) on delete cascade,
  level int not null check (level between 1 and 10),
  stars int not null default 0 check (stars >= 0),
  attempts_count int not null default 0 check (attempts_count >= 0),
  correct_count int not null default 0 check (correct_count >= 0),
  completed boolean not null default false,
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (child_id, mission_id)
);

create table if not exists public.class_rooms (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null default auth.uid() references public.profiles(id) on delete cascade,
  name text not null,
  grade int not null check (grade between 1 and 10),
  school_year text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.class_memberships (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.class_rooms(id) on delete cascade,
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now(),
  unique (class_id, child_id)
);

create table if not exists public.test_sessions (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  test_id text not null,
  status text not null check (status in ('started', 'completed')),
  score int not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  module_id text not null,
  recommendation text not null,
  priority int not null default 50,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.child_profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.topics enable row level security;
alter table public.skills enable row level security;
alter table public.missions enable row level security;
alter table public.task_templates enable row level security;
alter table public.generated_tasks enable row level security;
alter table public.attempts enable row level security;
alter table public.mission_progress enable row level security;
alter table public.class_rooms enable row level security;
alter table public.class_memberships enable row level security;
alter table public.test_sessions enable row level security;
alter table public.recommendations enable row level security;

revoke select (pin_hash) on public.child_profiles from anon, authenticated;
grant select (id, owner_id, name, grade, avatar, created_at) on public.child_profiles to authenticated;
grant select on public.subjects to authenticated;
grant select on public.topics to authenticated;
grant select on public.skills to authenticated;
grant select on public.missions to authenticated;
grant select on public.task_templates to authenticated;
grant select on public.generated_tasks to authenticated;
grant select, insert, update, delete on public.attempts to authenticated;
grant select, insert, update, delete on public.mission_progress to authenticated;
grant select, insert, update, delete on public.class_rooms to authenticated;
grant select, insert, update, delete on public.class_memberships to authenticated;
grant select, insert, update, delete on public.test_sessions to authenticated;
grant select, insert, update, delete on public.recommendations to authenticated;

drop policy if exists "profiles own row" on public.profiles;
create policy "profiles own row" on public.profiles
  for all using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "children owned by current profile" on public.child_profiles;
create policy "children owned by current profile" on public.child_profiles
  for all using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "children visible to class teachers" on public.child_profiles;
create policy "children visible to class teachers" on public.child_profiles
  for select using (
    exists (
      select 1
      from public.class_memberships cm
      join public.class_rooms cr on cr.id = cm.class_id
      where cm.child_id = child_profiles.id
        and cm.status = 'active'
        and cr.teacher_id = (select auth.uid())
    )
  );

drop policy if exists "skills readable by authenticated users" on public.skills;
create policy "skills readable by authenticated users" on public.skills
  for select to authenticated using (true);

drop policy if exists "subjects readable by authenticated users" on public.subjects;
create policy "subjects readable by authenticated users" on public.subjects
  for select to authenticated using (true);

drop policy if exists "topics readable by authenticated users" on public.topics;
create policy "topics readable by authenticated users" on public.topics
  for select to authenticated using (true);

drop policy if exists "missions readable by authenticated users" on public.missions;
create policy "missions readable by authenticated users" on public.missions
  for select to authenticated using (true);

drop policy if exists "task templates readable by authenticated users" on public.task_templates;
create policy "task templates readable by authenticated users" on public.task_templates
  for select to authenticated using (true);

drop policy if exists "generated tasks readable by authenticated users" on public.generated_tasks;
create policy "generated tasks readable by authenticated users" on public.generated_tasks
  for select to authenticated using (true);

drop policy if exists "class rooms owned by teachers" on public.class_rooms;
create policy "class rooms owned by teachers" on public.class_rooms
  for all using ((select auth.uid()) = teacher_id)
  with check (
    (select auth.uid()) = teacher_id
    and exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid()) and p.role = 'teacher'
    )
  );

drop policy if exists "class memberships for owning teachers" on public.class_memberships;
create policy "class memberships for owning teachers" on public.class_memberships
  for all using (
    exists (
      select 1 from public.class_rooms cr
      where cr.id = class_memberships.class_id and cr.teacher_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.class_rooms cr
      where cr.id = class_memberships.class_id and cr.teacher_id = (select auth.uid())
    )
    and exists (
      select 1 from public.child_profiles c
      where c.id = class_memberships.child_id and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "attempts for owned children" on public.attempts;
create policy "attempts for owned children" on public.attempts
  for all using (
    exists (
      select 1 from public.child_profiles c
      where c.id = attempts.child_id and c.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.child_profiles c
      where c.id = attempts.child_id and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "attempts visible to class teachers" on public.attempts;
create policy "attempts visible to class teachers" on public.attempts
  for select using (
    exists (
      select 1
      from public.class_memberships cm
      join public.class_rooms cr on cr.id = cm.class_id
      where cm.child_id = attempts.child_id
        and cm.status = 'active'
        and cr.teacher_id = (select auth.uid())
    )
  );

drop policy if exists "mission progress for owned children" on public.mission_progress;
create policy "mission progress for owned children" on public.mission_progress
  for all using (
    exists (
      select 1 from public.child_profiles c
      where c.id = mission_progress.child_id and c.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.child_profiles c
      where c.id = mission_progress.child_id and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "mission progress visible to class teachers" on public.mission_progress;
create policy "mission progress visible to class teachers" on public.mission_progress
  for select using (
    exists (
      select 1
      from public.class_memberships cm
      join public.class_rooms cr on cr.id = cm.class_id
      where cm.child_id = mission_progress.child_id
        and cm.status = 'active'
        and cr.teacher_id = (select auth.uid())
    )
  );

drop policy if exists "test sessions for owned children" on public.test_sessions;
create policy "test sessions for owned children" on public.test_sessions
  for all using (
    exists (
      select 1 from public.child_profiles c
      where c.id = test_sessions.child_id and c.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.child_profiles c
      where c.id = test_sessions.child_id and c.owner_id = (select auth.uid())
    )
  );

drop policy if exists "recommendations for owned children" on public.recommendations;
create policy "recommendations for owned children" on public.recommendations
  for all using (
    exists (
      select 1 from public.child_profiles c
      where c.id = recommendations.child_id and c.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.child_profiles c
      where c.id = recommendations.child_id and c.owner_id = (select auth.uid())
    )
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'role', 'parent')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.create_child_profile_with_pin(
  child_name text,
  child_grade int,
  child_avatar text,
  raw_pin text
)
returns table (
  id uuid,
  name text,
  grade int,
  avatar text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  created_id uuid;
begin
  if (select auth.uid()) is null then
    raise exception 'not authenticated';
  end if;
  if raw_pin !~ '^[0-9]{4,8}$' then
    raise exception 'pin must contain 4 to 8 digits';
  end if;

  insert into public.child_profiles (owner_id, name, grade, avatar, pin_hash)
  values ((select auth.uid()), child_name, child_grade, child_avatar, crypt(raw_pin, gen_salt('bf')))
  returning child_profiles.id into created_id;

  return query
    select c.id, c.name, c.grade, c.avatar, c.created_at
    from public.child_profiles c
    where c.id = created_id and c.owner_id = (select auth.uid());
end;
$$;

create or replace function public.verify_child_pin(child_id uuid, raw_pin text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.child_profiles c
    where c.id = child_id
      and c.owner_id = (select auth.uid())
      and c.pin_hash = crypt(raw_pin, c.pin_hash)
  );
$$;

grant execute on function public.create_child_profile_with_pin(text, int, text, text) to authenticated;
grant execute on function public.verify_child_pin(uuid, text) to authenticated;

create index if not exists attempts_child_created_idx on public.attempts (child_id, created_at desc);
create index if not exists attempts_child_subject_idx on public.attempts (child_id, subject_id);
create index if not exists attempts_child_module_idx on public.attempts (child_id, module_id);
create index if not exists attempts_child_mission_idx on public.attempts (child_id, mission_id);
create index if not exists task_templates_subject_grade_idx on public.task_templates (subject_id, grade_min, grade_max);
create index if not exists generated_tasks_template_idx on public.generated_tasks (template_id, created_at desc);
create index if not exists mission_progress_child_activity_idx on public.mission_progress (child_id, last_activity_at desc);
create index if not exists class_rooms_teacher_idx on public.class_rooms (teacher_id, created_at desc);
create index if not exists class_memberships_class_idx on public.class_memberships (class_id, status);
create index if not exists class_memberships_child_idx on public.class_memberships (child_id, status);

insert into public.subjects (id, title, description, visual, color, grade_min, grade_max, sort_order) values
  ('math', 'Mathe', 'Zahlen, Formen, Daten und Problemlösen.', '4', '#18a999', 1, 10, 1),
  ('german', 'Deutsch', 'Lesen, Schreiben, Grammatik und Sprache.', 'Aa', '#ff7568', 1, 10, 2),
  ('english', 'Englisch', 'Wortschatz, Sätze, Lesen und Übersetzen.', 'EN', '#4d96ff', 1, 10, 3),
  ('science', 'Sachkunde/Naturwissen', 'Natur, Körper, Wetter, Energie und Experimente.', '⚗', '#68bd7d', 1, 10, 4),
  ('history', 'Geschichte', 'Zeit, Quellen, Epochen und Ereignisse.', '⌛', '#b47dff', 5, 10, 5),
  ('geography', 'Geografie', 'Karten, Länder, Klima, Maßstab und Orientierung.', '⌖', '#f5a623', 3, 10, 6),
  ('computer-science', 'Informatik', 'Muster, Logik, Daten und Algorithmen.', '01', '#5468ff', 3, 10, 7)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  visual = excluded.visual,
  color = excluded.color,
  grade_min = excluded.grade_min,
  grade_max = excluded.grade_max,
  sort_order = excluded.sort_order;

insert into public.topics (id, subject_id, module_id, title, grade_min, grade_max) values
  ('math-arithmetic', 'math', 'arithmetic', 'Zahlen & Rechnen', 1, 6),
  ('math-geometry', 'math', 'geometry', 'Geometrie & Messen', 2, 10),
  ('math-data', 'math', 'statistics', 'Daten & Diagramme', 4, 10),
  ('de-language', 'german', 'german-language', 'Sprache untersuchen', 1, 10),
  ('en-basics', 'english', 'english-basics', 'Englisch verstehen', 1, 10),
  ('science-basics', 'science', 'science-world', 'Natur erforschen', 1, 10),
  ('history-basics', 'history', 'history-time', 'Zeit verstehen', 5, 10),
  ('geo-basics', 'geography', 'geography-map', 'Räume verstehen', 3, 10),
  ('cs-basics', 'computer-science', 'coding-logic', 'Logisch denken', 3, 10)
on conflict (id) do update set
  subject_id = excluded.subject_id,
  module_id = excluded.module_id,
  title = excluded.title,
  grade_min = excluded.grade_min,
  grade_max = excluded.grade_max;

insert into public.skills (id, subject_id, topic_id, module_id, title, grade_min, grade_max, description) values
  ('addition', 'math', 'math-arithmetic', 'arithmetic', 'Plus und Minus sicher rechnen', 1, 6, 'Grundrechenarten und Kopfrechnen'),
  ('multiplication', 'math', 'math-arithmetic', 'arithmetic', 'Einmaleins und Division', 2, 6, 'Mal- und Geteiltaufgaben'),
  ('fraction-of', 'math', 'math-arithmetic', 'fractions', 'Bruchteile berechnen', 4, 8, 'Anteile erkennen und berechnen'),
  ('percent-value', 'math', 'math-arithmetic', 'percent', 'Prozentwerte berechnen', 5, 10, 'Prozentrechnung im Alltag'),
  ('area', 'math', 'math-geometry', 'geometry', 'Flächen berechnen', 4, 10, 'Rechteck, Quadrat und zusammengesetzte Flächen'),
  ('mean', 'math', 'math-data', 'statistics', 'Mittelwert berechnen', 5, 10, 'Daten verstehen und auswerten'),
  ('parts-of-speech', 'german', 'de-language', 'german-language', 'Wortarten bestimmen', 1, 10, 'Nomen, Verben, Adjektive und weitere Wortarten'),
  ('vocabulary', 'english', 'en-basics', 'english-basics', 'Vokabeln verstehen', 1, 10, 'Grundwortschatz und einfache Übersetzung'),
  ('body-systems', 'science', 'science-basics', 'science-world', 'Körper und Natur verstehen', 1, 10, 'Naturwissen mit Alltagsbezug'),
  ('timeline', 'history', 'history-basics', 'history-time', 'Zeitstrahl und Quellen', 5, 10, 'Ereignisse und Begriffe einordnen'),
  ('compass', 'geography', 'geo-basics', 'geography-map', 'Karten lesen', 3, 10, 'Orientierung, Maßstab und Räume'),
  ('patterns', 'computer-science', 'cs-basics', 'coding-logic', 'Muster und Algorithmen', 3, 10, 'Logisches Denken und Daten')
on conflict (id) do update set
  subject_id = excluded.subject_id,
  topic_id = excluded.topic_id,
  module_id = excluded.module_id,
  title = excluded.title,
  grade_min = excluded.grade_min,
  grade_max = excluded.grade_max,
  description = excluded.description;

insert into public.missions (id, subject_id, module_id, title, description, badge, visual, grade_min, grade_max, target_count, sort_order) values
  ('zahlenwelt', 'math', 'arithmetic', 'Zahlenwelt', 'Schnell und sicher mit Plus, Minus, Mal und Geteilt.', 'Zahlen-Profi', '4', 1, 6, 6, 1),
  ('bruch-pizza', 'math', 'fractions', 'Bruch-Pizza', 'Teile erkennen, vergleichen und Bruchteile berechnen.', 'Bruch-Bäcker', '1/2', 3, 8, 6, 2),
  ('komma-werkstatt', 'math', 'decimals', 'Komma-Werkstatt', 'Dezimalzahlen lesen, runden und zusammenrechnen.', 'Komma-Meister', '0,5', 4, 8, 6, 3),
  ('prozent-shop', 'math', 'percent', 'Prozent-Shop', 'Rabatte, Prozentwerte und Grundwerte im Alltag.', 'Rabatt-Profi', '%', 5, 10, 6, 4),
  ('geometrie-labor', 'math', 'geometry', 'Geometrie-Labor', 'Formen, Umfang, Fläche, Winkel und Körper.', 'Formen-Forscher', '▭', 2, 10, 6, 5),
  ('einheiten-reise', 'math', 'measures', 'Einheiten-Reise', 'Längen, Zeiten, Geld, Gewicht und Volumen umwandeln.', 'Einheiten-Pilot', 'm', 2, 8, 6, 6),
  ('detektiv-texte', 'math', 'word-problems', 'Textaufgaben-Detektiv', 'Wichtige Informationen finden und den Rechenweg wählen.', 'Text-Detektiv', '?', 2, 8, 6, 7),
  ('gleichungs-dojo', 'math', 'equations', 'Gleichungs-Dojo', 'Platzhalter und einfache Gleichungen sauber lösen.', 'Gleichungs-Ninja', 'x', 5, 10, 6, 8),
  ('koordinaten-karte', 'math', 'coordinates', 'Koordinaten-Karte', 'Punkte lesen, Wege finden und Abstände bestimmen.', 'Karten-Profi', '(x|y)', 5, 10, 6, 9),
  ('statistik-studio', 'math', 'statistics', 'Statistik-Studio', 'Tabellen, Diagramme und Mittelwerte verstehen.', 'Daten-Profi', '▥', 4, 10, 6, 10),
  ('wort-werkstatt', 'german', 'german-language', 'Wort-Werkstatt', 'Wortarten, Rechtschreibung, Satzglieder und Lesen.', 'Sprach-Profi', 'Aa', 1, 10, 6, 11),
  ('english-quest', 'english', 'english-basics', 'English Quest', 'Vokabeln, einfache Sätze und kurze Texte verstehen.', 'Word Hero', 'EN', 1, 10, 6, 12),
  ('natur-labor', 'science', 'science-world', 'Natur-Labor', 'Körper, Pflanzen, Wetter, Energie und Experimente verstehen.', 'Natur-Profi', '⚗', 1, 10, 6, 13),
  ('zeitreise', 'history', 'history-time', 'Zeitreise', 'Epochen, Quellen und Ereignisse in Reihenfolge bringen.', 'Zeit-Profi', '⌛', 5, 10, 6, 14),
  ('karten-kompass', 'geography', 'geography-map', 'Karten-Kompass', 'Karten, Länder, Himmelsrichtungen und Maßstab üben.', 'Karten-Profi', '⌖', 3, 10, 6, 15),
  ('code-knacker', 'computer-science', 'coding-logic', 'Code-Knacker', 'Muster, Logik, Daten und Algorithmen verstehen.', 'Logik-Profi', '01', 3, 10, 6, 16)
on conflict (id) do update set
  subject_id = excluded.subject_id,
  module_id = excluded.module_id,
  title = excluded.title,
  description = excluded.description,
  badge = excluded.badge,
  visual = excluded.visual,
  grade_min = excluded.grade_min,
  grade_max = excluded.grade_max,
  target_count = excluded.target_count,
  sort_order = excluded.sort_order;

insert into public.task_templates (id, subject_id, topic_id, module_id, skill_id, title, answer_type, grade_min, grade_max, quality_rules, sort_order) values
  ('tpl-addition-flex', 'math', 'math-arithmetic', 'arithmetic', 'addition', 'Zahlen addieren', 'number', 1, 10, '{"checks":["integer-answer","grade-range"]}'::jsonb, 1),
  ('tpl-fraction-of-flex', 'math', 'math-arithmetic', 'fractions', 'fraction-of', 'Bruchteil berechnen', 'number', 3, 10, '{"checks":["whole-divisible-by-denominator"]}'::jsonb, 2),
  ('tpl-area-flex', 'math', 'math-geometry', 'geometry', 'area', 'Fläche berechnen', 'unit', 4, 10, '{"checks":["positive-lengths","unit-accepted"]}'::jsonb, 3),
  ('tpl-mean-flex', 'math', 'math-data', 'statistics', 'mean', 'Mittelwert berechnen', 'decimal', 5, 10, '{"checks":["non-empty-values","decimal-accepted"]}'::jsonb, 4),
  ('tpl-german-word-type', 'german', 'de-language', 'german-language', 'parts-of-speech', 'Wortarten bestimmen', 'multiple-choice', 1, 10, '{"checks":["single-correct-term"]}'::jsonb, 5),
  ('tpl-german-spelling', 'german', 'de-language', 'german-language', 'spelling', 'Rechtschreibung', 'text', 1, 10, '{"checks":["one-correct-spelling"]}'::jsonb, 6),
  ('tpl-english-vocabulary', 'english', 'en-basics', 'english-basics', 'vocabulary', 'Vokabeln', 'text', 1, 10, '{"checks":["accepted-lowercase"]}'::jsonb, 7),
  ('tpl-english-sentence-order', 'english', 'en-basics', 'english-basics', 'sentence-order', 'Satzbau', 'text', 3, 10, '{"checks":["sentence-answer"]}'::jsonb, 8),
  ('tpl-science-body', 'science', 'science-basics', 'science-world', 'body-systems', 'Körperwissen', 'text', 1, 10, '{"checks":["fact-answer"]}'::jsonb, 9),
  ('tpl-science-weather', 'science', 'science-basics', 'science-world', 'weather', 'Wetter', 'multiple-choice', 1, 10, '{"checks":["fact-answer"]}'::jsonb, 10),
  ('tpl-history-timeline', 'history', 'history-basics', 'history-time', 'timeline', 'Zeitstrahl', 'text', 5, 10, '{"checks":["chronology"]}'::jsonb, 11),
  ('tpl-history-sources', 'history', 'history-basics', 'history-time', 'sources', 'Quellen verstehen', 'text', 5, 10, '{"checks":["source-or-era"]}'::jsonb, 12),
  ('tpl-geography-compass', 'geography', 'geo-basics', 'geography-map', 'compass', 'Himmelsrichtungen', 'text', 3, 10, '{"checks":["map-orientation"]}'::jsonb, 13),
  ('tpl-geography-scale', 'geography', 'geo-basics', 'geography-map', 'scale', 'Maßstab', 'unit', 5, 10, '{"checks":["positive-scale"]}'::jsonb, 14),
  ('tpl-cs-patterns', 'computer-science', 'cs-basics', 'coding-logic', 'patterns', 'Muster erkennen', 'number', 3, 10, '{"checks":["arithmetic-pattern"]}'::jsonb, 15),
  ('tpl-cs-binary', 'computer-science', 'cs-basics', 'coding-logic', 'binary', 'Binärzahlen', 'number', 5, 10, '{"checks":["binary-range"]}'::jsonb, 16)
on conflict (id) do update set
  subject_id = excluded.subject_id,
  topic_id = excluded.topic_id,
  module_id = excluded.module_id,
  skill_id = excluded.skill_id,
  title = excluded.title,
  answer_type = excluded.answer_type,
  grade_min = excluded.grade_min,
  grade_max = excluded.grade_max,
  quality_rules = excluded.quality_rules,
  sort_order = excluded.sort_order;
