// Analytics maison, ultra-léger : POST direct vers l'API REST Supabase.
// On n'importe PAS @supabase/supabase-js ici — la bibliothèque complète ne doit
// peser que sur /admin, jamais sur les pages vues par les visiteurs.

const SUPA_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPA_ANON = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Identifiant anonyme stable (approximation « visiteurs uniques »).
// Aucune donnée personnelle : ni IP, ni empreinte de navigateur.
function visitorId() {
  try {
    let id = localStorage.getItem('tas_vid');
    if (!id) {
      id =
        (crypto.randomUUID && crypto.randomUUID()) ||
        String(Date.now()) + Math.random().toString(36).slice(2);
      localStorage.setItem('tas_vid', id);
    }
    return id;
  } catch {
    return null;
  }
}

function deviceType(ua) {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Temps passé : au départ ou au masquage de l'onglet, on renseigne la durée sur
// la ligne de visite. Best-effort — certaines fermetures brutales y échappent ;
// la moyenne se calcule sur les visites qui en ont une.
function armDurationTracking(visitId) {
  if (!visitId) return;
  const startedAt = Date.now();
  const send = () => {
    const s = Math.round((Date.now() - startedAt) / 1000);
    if (s < 1 || s > 6 * 3600) return; // aberrant : < 1 s ou > 6 h
    try {
      fetch(`${SUPA_URL}/rest/v1/site_visits?id=eq.${visitId}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPA_ANON,
          Authorization: `Bearer ${SUPA_ANON}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ duration_s: s }),
        keepalive: true,
      });
    } catch {
      /* silencieux */
    }
  };
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') send();
  });
  window.addEventListener('pagehide', send);
  window.addEventListener('beforeunload', send); // couverture desktop supplémentaire
}

// Enregistre l'appareil dans analytics_excluded (visible côté admin).
// Appelé quand le visiteur ouvre …/?noanalytics=1. Best-effort, silencieux.
async function registerExclusion() {
  if (!SUPA_URL || !SUPA_ANON) return;
  try {
    const vid = visitorId();
    if (!vid) return;
    await fetch(`${SUPA_URL}/rest/v1/analytics_excluded?on_conflict=visitor_id`, {
      method: 'POST',
      headers: {
        apikey: SUPA_ANON,
        Authorization: `Bearer ${SUPA_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=ignore-duplicates,return=minimal',
      },
      body: JSON.stringify({ visitor_id: vid, note: 'opt-out via lien' }),
      keepalive: true,
    });
  } catch {
    /* silencieux */
  }
}

/**
 * Enregistre une visite.
 *
 * Silencieux de bout en bout : une statistique manquante est sans conséquence,
 * une page cassée ne l'est pas. Aucune erreur ne doit remonter jusqu'au
 * visiteur — d'où les `catch` vides, ici volontaires.
 */
export async function trackVisit() {
  if (!SUPA_URL || !SUPA_ANON) return; // site déployé sans analytics : on ne fait rien
  try {
    // Opt-out permanent : ouvrir …/?noanalytics=1 pose un drapeau sur CET
    // appareil (utile pour le client et pour toi) → vos propres visites ne sont
    // plus comptées. …/?noanalytics=0 réactive. Plus fiable qu'un filtre par IP,
    // qui change en 4G/5G.
    try {
      const qs = new URLSearchParams(location.search);
      if (qs.get('noanalytics') === '1') {
        localStorage.setItem('tas_noanalytics', '1');
        registerExclusion();
      }
      if (qs.get('noanalytics') === '0') localStorage.removeItem('tas_noanalytics');
      if (localStorage.getItem('tas_noanalytics') === '1') return;
    } catch {
      /* localStorage indisponible : on continue normalement */
    }

    // Anti-doublon : une visite par onglet au maximum toutes les 30 minutes.
    const now = Date.now();
    const last = Number(sessionStorage.getItem('tas_last_track') || 0);
    if (now - last < 30 * 60 * 1000) return;
    sessionStorage.setItem('tas_last_track', String(now));

    const params = new URLSearchParams(location.search);
    const ref = document.referrer || '';
    let refHost = '';
    try {
      refHost = ref ? new URL(ref).hostname.replace(/^www\./, '') : '';
    } catch {
      refHost = '';
    }
    // Référent interne ignoré : naviguer d'une page à l'autre du site n'est pas
    // une « provenance ».
    if (refHost === location.hostname.replace(/^www\./, '')) refHost = '';

    const ua = navigator.userAgent || '';
    // Id généré côté client : c'est lui qui permet de compléter la durée au départ.
    const visitId = crypto && crypto.randomUUID ? crypto.randomUUID() : null;
    const payload = {
      ...(visitId ? { id: visitId } : {}),
      visitor_id: visitorId(),
      path: location.pathname || '/',
      referrer: ref ? ref.slice(0, 300) : null,
      referrer_host: refHost || null,
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      device: deviceType(ua),
      browser_lang: (navigator.language || '').slice(0, 8) || null,
      screen_w: (window.screen && window.screen.width) || null,
    };

    await fetch(`${SUPA_URL}/rest/v1/site_visits`, {
      method: 'POST',
      headers: {
        apikey: SUPA_ANON,
        Authorization: `Bearer ${SUPA_ANON}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });

    armDurationTracking(visitId);
  } catch {
    /* on ignore toute erreur */
  }
}
