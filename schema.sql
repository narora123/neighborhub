
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  display_name text,
  bio text,
  lat double precision,
  lon double precision,
  created_at timestamp with time zone default now()
);
alter table profiles enable row level security;
create policy "profiles view" on profiles for select using (auth.role() = 'authenticated');
create policy "profiles insert self" on profiles for insert with check (auth.uid() = id);
create policy "profiles update self" on profiles for update using (auth.uid() = id);

create table if not exists jobs(
  id uuid primary key default gen_random_uuid(),
  owner uuid references profiles(id) on delete cascade,
  title text not null,
  description text not null,
  created_at timestamp with time zone default now()
);
alter table jobs enable row level security;
create policy "jobs read" on jobs for select using (true);
create policy "jobs insert" on jobs for insert with check (auth.uid() = owner);
create policy "jobs update owner" on jobs for update using (auth.uid() = owner);
create policy "jobs delete owner" on jobs for delete using (auth.uid() = owner);

create table if not exists favorites(
  profile_id uuid references profiles(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key(profile_id, job_id)
);
alter table favorites enable row level security;
create policy "favorites read" on favorites for select using (auth.role() = 'authenticated');
create policy "favorites insert own" on favorites for insert with check (auth.uid() = profile_id);
create policy "favorites delete own" on favorites for delete using (auth.uid() = profile_id);

create table if not exists reports(
  id uuid primary key default gen_random_uuid(),
  reporter uuid references profiles(id) on delete set null,
  target_profile uuid references profiles(id) on delete set null,
  target_job uuid references jobs(id) on delete set null,
  reason text,
  created_at timestamp with time zone default now()
);
alter table reports enable row level security;
create policy "reports insert" on reports for insert with check (auth.role() = 'authenticated');

create table if not exists job_applications(
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  applicant uuid references profiles(id) on delete cascade,
  created_at timestamp with time zone default now()
);
alter table job_applications enable row level security;
create policy "apps read" on job_applications for select using (auth.role() = 'authenticated');
create policy "apps insert" on job_applications for insert with check (auth.role() = 'authenticated');
create policy "apps delete own" on job_applications for delete using (auth.uid() = applicant);

create table if not exists threads(
  id uuid primary key default gen_random_uuid(),
  key text unique,
  created_at timestamp with time zone default now()
);
create table if not exists thread_participants(
  thread_id uuid references threads(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key(thread_id,user_id)
);
create table if not exists messages(
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  sender uuid references profiles(id) on delete cascade,
  body text not null,
  created_at timestamp with time zone default now()
);
alter table threads enable row level security;
alter table thread_participants enable row level security;
alter table messages enable row level security;
create policy "threads see if participant" on threads for select using (exists(select 1 from thread_participants tp where tp.thread_id=threads.id and tp.user_id=auth.uid()));
create policy "threads insert auth" on threads for insert with check (auth.role()='authenticated');
create policy "participants read self" on thread_participants for select using (user_id=auth.uid());
create policy "participants insert auth" on thread_participants for insert with check (auth.role()='authenticated');
create policy "messages read in-thread" on messages for select using (exists(select 1 from thread_participants tp where tp.thread_id=messages.thread_id and tp.user_id=auth.uid()));
create policy "messages insert in-thread" on messages for insert with check (exists(select 1 from thread_participants tp where tp.thread_id=messages.thread_id and tp.user_id=auth.uid()));
