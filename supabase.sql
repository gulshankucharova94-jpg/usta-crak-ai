-- Supabase Dashboard > SQL Editor > New query > paste this > Run
create table if not exists public.presentations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  slides jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.presentations enable row level security;
drop policy if exists "Users can read own presentations" on public.presentations;
create policy "Users can read own presentations" on public.presentations for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Users can create own presentations" on public.presentations;
create policy "Users can create own presentations" on public.presentations for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users can update own presentations" on public.presentations;
create policy "Users can update own presentations" on public.presentations for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users can delete own presentations" on public.presentations;
create policy "Users can delete own presentations" on public.presentations for delete to authenticated using (auth.uid() = user_id);
