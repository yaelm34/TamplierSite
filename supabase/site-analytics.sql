-- ============================================================
--  TAMPLIER AUTO SOURCING — Analytics du site
--  À coller dans Supabase > SQL Editor > New query > Run. Idempotent.
--
--  Enregistre une ligne par visite. Insertion publique (clé anon), lecture
--  réservée aux administrateurs (page /admin).
--
--  ⚠️ AUTONOME, contrairement à la version CarnaFish : ce projet n'a pas de
--  table `profiles`. L'appartenance à l'administration se déclare donc dans
--  `site_admins` (voir l'étape 0 en fin de fichier).
-- ============================================================

-- ------------------------------------------------------------
--  0) Qui est administrateur
--
--  Une table dédiée plutôt qu'un drapeau sur un profil : le seul privilège à
--  accorder ici est la lecture des statistiques. Y ajouter quelqu'un est un
--  geste explicite, et retirer l'accès se fait d'une ligne.
-- ------------------------------------------------------------
create table if not exists public.site_admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  note       text,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;

-- Aucune policy de lecture publique : seule la fonction ci-dessous consulte
-- cette table, et elle le fait en SECURITY DEFINER.
drop policy if exists "admins: read own" on public.site_admins;
create policy "admins: read own" on public.site_admins
  for select using (user_id = auth.uid());

-- SECURITY DEFINER : les policies ci-dessous doivent pouvoir tester
-- l'appartenance SANS que le demandeur ait le droit de lire la table.
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.site_admins a where a.user_id = uid);
$$;

grant execute on function public.is_admin(uuid) to authenticated, anon;

-- ------------------------------------------------------------
--  1) Les visites
-- ------------------------------------------------------------
create table if not exists public.site_visits (
  id            uuid primary key default gen_random_uuid(),
  visitor_id    text,        -- id anonyme stocké côté navigateur (approx. uniques)
  path          text,
  referrer      text,
  referrer_host text,        -- domaine du référent (provenance)
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  device        text,        -- mobile | tablet | desktop
  browser_lang  text,
  screen_w      integer,
  duration_s    integer,     -- temps passé, renseigné au départ du visiteur
  created_at    timestamptz default now()
);

alter table public.site_visits enable row level security;

-- Insertion publique : le site enregistre les visites (aucune lecture publique).
drop policy if exists "visits: public insert" on public.site_visits;
create policy "visits: public insert" on public.site_visits
  for insert with check (true);

-- Mise à jour publique : le navigateur complète la durée de SA visite au moment
-- de quitter la page (analytics, faible enjeu). La lecture reste admin-only.
drop policy if exists "visits: public update" on public.site_visits;
create policy "visits: public update" on public.site_visits
  for update using (true) with check (true);

drop policy if exists "visits: admin read" on public.site_visits;
create policy "visits: admin read" on public.site_visits
  for select using (public.is_admin(auth.uid()));

create index if not exists site_visits_created_idx on public.site_visits (created_at desc);
create index if not exists site_visits_refhost_idx on public.site_visits (referrer_host);

-- ------------------------------------------------------------
--  2) Appareils exclus des statistiques
--
--  On ne SUPPRIME pas leurs visites, on les FILTRE à l'affichage : effacer
--  rendrait l'exclusion irréversible, alors qu'on veut pouvoir la retirer.
-- ------------------------------------------------------------
create table if not exists public.analytics_excluded (
  visitor_id text primary key,
  note       text,
  created_at timestamptz default now()
);
alter table public.analytics_excluded enable row level security;

drop policy if exists "excluded: admin all" on public.analytics_excluded;
create policy "excluded: admin all" on public.analytics_excluded
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Insertion publique : permet à un visiteur de s'auto-exclure via ?noanalytics=1
-- (il n'ajoute que son propre identifiant anonyme). Lecture et suppression
-- restent réservées à l'administration.
drop policy if exists "excluded: public insert" on public.analytics_excluded;
create policy "excluded: public insert" on public.analytics_excluded
  for insert with check (true);

-- ------------------------------------------------------------
--  3) Remise à zéro (bouton de la page /admin)
-- ------------------------------------------------------------
create or replace function public.reset_site_visits()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  if not public.is_admin(auth.uid()) then
    raise exception 'Accès refusé : réservé aux administrateurs.';
  end if;
  -- TRUNCATE et non DELETE : l'extension safeupdate de Supabase rejette même
  -- « DELETE ... WHERE true ».
  select count(*) into n from public.site_visits;
  truncate table public.site_visits;
  return n;
end;
$$;

revoke all on function public.reset_site_visits() from public, anon;
grant execute on function public.reset_site_visits() to authenticated;

-- ============================================================
--  À FAIRE APRÈS LE RUN — déclarer l'administrateur
--
--  1. Authentication > Users > Add user : crée le compte du client
--     (e-mail + mot de passe), puis copie son UID.
--  2. Exécute, en remplaçant l'UID :
--
--       insert into public.site_admins (user_id, note)
--       values ('00000000-0000-0000-0000-000000000000', 'client')
--       on conflict do nothing;
--
--  Sans cette ligne, la page /admin affichera « ce compte n'est pas
--  administrateur » — c'est voulu : aucun compte n'est privilégié par défaut.
-- ============================================================

-- Vérifications :
--   select count(*) from public.site_visits;
--   select user_id, note from public.site_admins;
