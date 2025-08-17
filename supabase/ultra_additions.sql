create table if not exists favorites(
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  job_id uuid references jobs(id) on delete cascade,
  created_at timestamp with time zone default now()
);
create table if not exists reports(
  id uuid primary key default gen_random_uuid(),
  reporter uuid references profiles(id) on delete set null,
  target_profile uuid references profiles(id) on delete set null,
  target_job uuid references jobs(id) on delete set null,
  reason text,
  created_at timestamp with time zone default now()
);
alter table profiles add column if not exists lat double precision;
alter table profiles add column if not exists lon double precision;
alter table favorites enable row level security;
alter table reports enable row level security;
create policy "favorites readable" on favorites for select using (auth.role() = 'authenticated');
create policy "insert own favorite" on favorites for insert with check (auth.uid() = profile_id);
create policy "delete own favorite" on favorites for delete using (auth.uid() = profile_id);
create policy "reports readable for admins only" on reports for select using (false);
create policy "insert report" on reports for insert with check (auth.role() = 'authenticated');
