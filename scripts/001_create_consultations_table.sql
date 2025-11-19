-- Create consultations table to store booking requests
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  preferred_date date not null,
  preferred_time text not null,
  message text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.consultations enable row level security;

-- Create policy to allow anyone to insert consultations (public booking form)
create policy "Allow public to insert consultations"
  on public.consultations
  for insert
  with check (true);

-- Create policy to allow reading all consultations (for admin purposes)
-- Note: In production, you'd want to restrict this to admin users only
create policy "Allow reading all consultations"
  on public.consultations
  for select
  using (true);

-- Create index for faster lookups
create index if not exists consultations_email_idx on public.consultations(email);
create index if not exists consultations_created_at_idx on public.consultations(created_at desc);
