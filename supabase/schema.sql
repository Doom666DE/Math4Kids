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

create table if not exists public.skills (
  id text primary key,
  module_id text not null,
  title text not null,
  grade_min int not null check (grade_min between 1 and 10),
  grade_max int not null check (grade_max between 1 and 10),
  description text not null default ''
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
alter table public.skills enable row level security;
alter table public.attempts enable row level security;
alter table public.test_sessions enable row level security;
alter table public.recommendations enable row level security;

revoke select (pin_hash) on public.child_profiles from anon, authenticated;
grant select (id, owner_id, name, grade, avatar, created_at) on public.child_profiles to authenticated;

create policy "profiles own row" on public.profiles
  for all using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "children owned by current profile" on public.child_profiles
  for all using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "skills readable by authenticated users" on public.skills
  for select to authenticated using (true);

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

insert into public.skills (id, module_id, title, grade_min, grade_max, description) values
  ('addition', 'arithmetic', 'Plus und Minus sicher rechnen', 1, 6, 'Grundrechenarten und Kopfrechnen'),
  ('multiplication', 'arithmetic', 'Einmaleins und Division', 2, 6, 'Mal- und Geteiltaufgaben'),
  ('fraction-of', 'fractions', 'Bruchteile berechnen', 4, 8, 'Anteile erkennen und berechnen'),
  ('percent-value', 'percent', 'Prozentwerte berechnen', 5, 10, 'Prozentrechnung im Alltag'),
  ('perimeter', 'geometry', 'Umfang berechnen', 3, 8, 'Seitenlängen addieren'),
  ('area', 'geometry', 'Flächen berechnen', 4, 10, 'Rechteck, Quadrat und zusammengesetzte Flächen'),
  ('time', 'measures', 'Zeit umrechnen', 2, 6, 'Stunden, Minuten und Sekunden'),
  ('linear', 'equations', 'Einfache Gleichungen lösen', 5, 10, 'Platzhalter und Umformen'),
  ('mean', 'statistics', 'Mittelwert berechnen', 5, 10, 'Daten verstehen und auswerten')
on conflict (id) do update set
  module_id = excluded.module_id,
  title = excluded.title,
  grade_min = excluded.grade_min,
  grade_max = excluded.grade_max,
  description = excluded.description;
