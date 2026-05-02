-- Create jobs table for job postings
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  venue_name text not null,
  venue_type text not null check (venue_type in ('bar', 'nightclub', 'lounge', 'restaurant', 'event', 'other')),
  location text not null,
  job_type text not null check (job_type in ('full_time', 'part_time', 'contract', 'freelance')),
  description text not null,
  requirements text,
  pay_range text,
  status text default 'open' check (status in ('open', 'closed', 'filled')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.jobs enable row level security;

-- Jobs policies
create policy "jobs_select_all"
  on public.jobs for select
  using (true);

create policy "jobs_insert_own"
  on public.jobs for insert
  with check (auth.uid() = author_id);

create policy "jobs_update_own"
  on public.jobs for update
  using (auth.uid() = author_id);

create policy "jobs_delete_own"
  on public.jobs for delete
  using (auth.uid() = author_id);

-- Create indexes
create index if not exists jobs_author_id_idx on public.jobs(author_id);
create index if not exists jobs_created_at_idx on public.jobs(created_at desc);
create index if not exists jobs_status_idx on public.jobs(status);
