
-- NeighborHub core schema (Postgres / Supabase)
create table if not exists profiles(
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  address text,
  community_id uuid,
  is_verified boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists communities(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  state text,
  created_at timestamp with time zone default now()
);

create table if not exists memberships(
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  community_id uuid references communities(id) on delete cascade,
  role text check (role in ('member','admin')) default 'member',
  created_at timestamp with time zone default now()
);

create table if not exists jobs(
  id uuid primary key default gen_random_uuid(),
  creator uuid references profiles(id) on delete set null,
  title text not null,
  description text,
  category text,
  price_cents integer not null default 2000,
  when_text text,
  location_text text,
  status text check (status in ('open','accepted','completed','canceled')) default 'open',
  created_at timestamp with time zone default now()
);

create table if not exists job_offers(
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  provider uuid references profiles(id) on delete set null,
  amount_cents integer,
  message text,
  status text check (status in ('pending','accepted','declined')) default 'pending',
  created_at timestamp with time zone default now()
);

create table if not exists reviews(
  id uuid primary key default gen_random_uuid(),
  reviewer uuid references profiles(id) on delete set null,
  reviewee uuid references profiles(id) on delete set null,
  job_id uuid references jobs(id) on delete set null,
  rating int check (rating between 1 and 5),
  body text,
  created_at timestamp with time zone default now()
);

create table if not exists messages(
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  sender uuid references profiles(id) on delete set null,
  body text not null,
  created_at timestamp with time zone default now()
);

-- Convenience view for dashboard
create or replace view jobs_view as
  select j.*, p.full_name as creator_name
  from jobs j left join profiles p on p.id = j.creator;

-- Basic RLS
alter table profiles enable row level security;
alter table communities enable row level security;
alter table memberships enable row level security;
alter table jobs enable row level security;
alter table job_offers enable row level security;
alter table reviews enable row level security;
alter table messages enable row level security;

-- Public readable lists; write restricted to owners
create policy "profiles are readable by self" on profiles
  for select using (auth.uid() = id);

create policy "insert own profile" on profiles
  for insert with check (auth.uid() = id);

create policy "update own profile" on profiles
  for update using (auth.uid() = id);

create policy "jobs readable" on jobs
  for select using (true);

create policy "insert jobs for self" on jobs
  for insert with check (auth.uid() = creator);

create policy "update own open jobs" on jobs
  for update using (auth.uid() = creator);

create policy "offers readable" on job_offers
  for select using (true);

create policy "insert offer" on job_offers
  for insert with check (auth.uid() = provider);

create policy "messages readable" on messages
  for select using (true);

create policy "insert message" on messages
  for insert with check (auth.uid() = sender);

create policy "reviews readable" on reviews for select using (true);
create policy "insert review" on reviews for insert with check (auth.uid() = reviewer);
