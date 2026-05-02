-- Create likes table for job post likes
create table if not exists public.job_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, job_id)
);

-- Enable RLS
alter table public.job_likes enable row level security;

-- Likes policies
create policy "job_likes_select_all"
  on public.job_likes for select
  using (true);

create policy "job_likes_insert_own"
  on public.job_likes for insert
  with check (auth.uid() = user_id);

create policy "job_likes_delete_own"
  on public.job_likes for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists job_likes_user_id_idx on public.job_likes(user_id);
create index if not exists job_likes_job_id_idx on public.job_likes(job_id);
