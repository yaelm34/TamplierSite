// ============================================================
//  MOTION ENGINE — Lenis smooth-scroll + GSAP ScrollTrigger
//  Every effect degrades gracefully under prefers-reduced-motion.
// ============================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Sur mobile, l'apparition/disparition de la barre d'URL compte comme un resize
// et déclenche un refresh complet de TOUS les ScrollTrigger en plein scroll —
// source de saccades très visible. La hauteur ne change pas vraiment : on ignore.
ScrollTrigger.config({ ignoreMobileResize: true });

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isTouch =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches;

/* ---------- 1. Smooth scroll ---------- */
function initLenis() {
  if (reduced) return;
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links routed through Lenis
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
      // close mobile menu if open
      document.documentElement.removeAttribute('data-menu-open');
    });
  });
  return lenis;
}

/* ---------- 2. Split-text reveal ---------- */
function splitReveal() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const lines = el.querySelectorAll<HTMLElement>('.line-inner');
    if (reduced) {
      gsap.set(lines, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.set(lines, { yPercent: 115 });
    gsap.to(lines, {
      yPercent: 0,
      duration: 1.25,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });
}

/* ---------- 3. Signature image reveal (blur + scale + clip) ---------- */
function imageReveals() {
  document.querySelectorAll<HTMLElement>('[data-img-reveal]').forEach((el) => {
    const img = el.querySelector('img');
    if (reduced) return;
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(img, { scale: 1.12, filter: 'blur(18px)', opacity: 0 });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 82%' },
    });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'power3.out' })
      .to(
        img,
        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.5, ease: 'power3.out' },
        0
      )
      .add(() => gsap.set(el, { clearProps: 'will-change' }));
  });
}

/* ---------- 4. Generic fade/rise reveals ---------- */
function fadeReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal="rise"]').forEach((el) => {
    if (reduced) return;
    const delay = parseFloat(el.dataset.delay || '0');
    gsap.set(el, { y: 40, opacity: 0 });
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      delay,
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onComplete: () => gsap.set(el, { clearProps: 'will-change' }),
    });
  });

  // Staggered groups
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    if (reduced) return;
    const children = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
    gsap.set(children, { y: 46, opacity: 0 });
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 80%' },
    });
  });
}

/* ---------- 5. Parallax layers ---------- */
function parallax() {
  if (reduced || isTouch) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '0.3');
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('[data-parallax-scope]') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
}

/* ---------- 6. Hero cinematic ---------- */
function hero() {
  const heroEl = document.querySelector<HTMLElement>('[data-hero]');
  if (!heroEl || reduced) return;

  // slow perpetual breath on the car
  const img = heroEl.querySelector<HTMLElement>('[data-hero-media] img');
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.03 },
      { scale: 1.1, duration: 18, ease: 'sine.inOut', repeat: -1, yoyo: true }
    );
  }
  // car drifts up slightly as you leave the hero
  const media = heroEl.querySelector<HTMLElement>('[data-hero-media]');
  if (media) {
    gsap.to(media, {
      yPercent: -7,
      ease: 'none',
      scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

/* ---------- 6b. Hero title — word-by-word masked rise ---------- */
function heroWords() {
  const el = document.querySelector<HTMLElement>('[data-word-reveal]');
  if (!el) return;
  const inners = el.querySelectorAll<HTMLElement>('.w-inner');
  if (reduced) {
    gsap.set(inners, { yPercent: 0, rotate: 0 });
    return;
  }
  gsap.set(inners, { yPercent: 120, rotate: 5 });
  gsap.to(inners, {
    yPercent: 0,
    rotate: 0,
    duration: 1.5,
    ease: 'expo.out',
    stagger: 0.07,
    delay: 0.55,
  });
}

/* ---------- 6c. Manifesto — words fill on scroll scrub ---------- */
function wordScrub() {
  document.querySelectorAll<HTMLElement>('[data-word-scrub]').forEach((el) => {
    const words = el.querySelectorAll<HTMLElement>('.scrub-word');
    if (reduced || words.length === 0) {
      gsap.set(words, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      words,
      { opacity: 0.13 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.4 },
      }
    );
  });
}

/* ---------- 7. Horizontal pinned steps ---------- */
function horizontalSteps() {
  const section = document.querySelector<HTMLElement>('[data-h-scroll]');
  if (!section) return;
  const track = section.querySelector<HTMLElement>('[data-h-track]');
  const progress = section.querySelector<HTMLElement>('[data-h-progress]');
  if (!track) return;

  if (reduced || window.innerWidth < 1024) {
    // vertical fallback — nothing to pin
    if (progress) progress.style.display = 'none';
    return;
  }

  const getScroll = () => track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: () => -getScroll(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => '+=' + getScroll(),
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progress) progress.style.transform = `scaleX(${self.progress})`;
      },
    },
  });
}

/* ---------- 8. Animated counters ---------- */
function counters() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    if (reduced) {
      el.textContent = `${end}${suffix}`;
      return;
    }
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        }),
    });
  });
}

/* ---------- 9. Header scroll state (+ hide on scroll down) ---------- */
function header() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = window.scrollY;
      header.setAttribute('data-scrolled', y > 60 ? 'true' : 'false');
      // reading mode: header retires going down, returns going up
      if (!reduced && y > 320 && self.direction === 1) {
        header.setAttribute('data-hidden', 'true');
      } else {
        header.setAttribute('data-hidden', 'false');
      }
    },
  });
}

/* ---------- 10. Mouse-follow glow ---------- */
function glow() {
  if (reduced || isTouch) return;
  document.querySelectorAll<HTMLElement>('.glow-follow').forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    // Écriture des variables CSS regroupée dans une frame : un pointermove peut
    // se déclencher plusieurs fois par frame, et chaque `setProperty` invalide le
    // style du bloc — de quoi hacher le scroll sur les sections sombres.
    let pending = false;
    let px = 0;
    let py = 0;
    parent.addEventListener('pointermove', (e) => {
      px = e.clientX;
      py = e.clientY;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const r = parent.getBoundingClientRect();
        el.style.setProperty('--gx', `${px - r.left}px`);
        el.style.setProperty('--gy', `${py - r.top}px`);
        el.style.setProperty('--go', '1');
      });
    });
    parent.addEventListener('pointerleave', () => el.style.setProperty('--go', '0'));
  });
}

/* ---------- 11. Magnetic buttons ----------
   Le curseur personnalisé (anneau + point qui suivaient la souris) a été retiré :
   `mix-blend-mode: difference` sur un élément `position: fixed` en z-index 9999
   force le navigateur à recomposer tout le plan à chaque frame — c'est le même
   piège que celui documenté sur `.grain`, et il coûtait la fluidité du scroll.
   Seul l'effet magnétique des boutons est conservé, et uniquement sur les
   éléments qui le demandent (au lieu d'écouter tous les `a` et `button`). */
function magnetic() {
  if (reduced || isTouch) return;

  // Amplitude : fraction de la distance curseur ↔ centre, puis PLAFOND en pixels.
  // MAX_X = 6 px, soit la MOITIÉ de l'écart entre deux CTA voisins (`gap-3`, 12 px).
  // En passant vite d'un bouton à l'autre, le premier revient encore au repos
  // pendant que le second s'écarte : c'est le seul instant où les deux bougent en
  // même temps. Plafonner à la demi-gouttière rend leur rencontre impossible,
  // quel que soit le moment où la souris passe de l'un à l'autre.
  const PULL_X = 0.16;
  const PULL_Y = 0.22;
  const MAX_X = 6;
  const MAX_Y = 8;
  const clamp = (v: number, max: number) => (v > max ? max : v < -max ? -max : v);

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    // UN seul tween par axe, réutilisé : `quickTo` remet à jour sa cible au lieu
    // de créer un tween par frame. Deux tweens concurrents sur la même propriété
    // se disputaient l'élément — c'est ce qui le laissait parfois décalé, donc
    // superposé au bouton voisin, quand la souris sortait pendant une animation.
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      // ⚠️ `getBoundingClientRect` mesure l'élément DÉJÀ déplacé. En s'en servant
      // tel quel, le centre de référence suivait le bouton : plus il s'éloignait,
      // plus l'écart mesuré restait grand, et le déplacement s'auto-entretenait.
      // On retranche donc la translation en cours pour retrouver le centre AU REPOS.
      const cx = r.left + r.width / 2 - (gsap.getProperty(el, 'x') as number);
      const cy = r.top + r.height / 2 - (gsap.getProperty(el, 'y') as number);
      xTo(clamp((px - cx) * PULL_X, MAX_X));
      yTo(clamp((py - cy) * PULL_Y, MAX_Y));
    };

    el.addEventListener('pointermove', (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    });

    const release = () => {
      // La frame en attente est annulée : sinon elle se déclenchait APRÈS le
      // retour au repos et redéplaçait le bouton une fois la souris partie.
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      // Retour sans rebond : l'`elastic` précédent dépassait le point d'origine,
      // ce qui se lisait comme un chevauchement entre deux boutons voisins.
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointerleave', release);
    el.addEventListener('pointercancel', release);
    // Filet : si le bouton glisse hors du curseur, `pointerleave` peut manquer.
    el.addEventListener('blur', release);
  });
}

/* ---------- 12. Preloader curtain ---------- */
function preloader() {
  const curtain = document.querySelector<HTMLElement>('[data-preloader]');
  if (!curtain) return;
  let done = false;

  const cleanup = () => {
    if (curtain.isConnected) curtain.remove();
    document.documentElement.removeAttribute('data-loading');
    ScrollTrigger.refresh();
  };

  const finish = () => {
    if (done) return;
    done = true;

    // Hard fallback: if RAF is throttled (hidden tab) the tween's onComplete
    // may never fire — guarantee removal so the page is never trapped.
    const safety = window.setTimeout(cleanup, 1900);

    if (reduced) {
      window.clearTimeout(safety);
      cleanup();
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(safety);
        cleanup();
      },
    });
    tl.to(curtain.querySelector('[data-preloader-mark]'), {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    }).to(curtain, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.1');
  };

  if (document.readyState === 'complete') setTimeout(finish, 300);
  else window.addEventListener('load', () => setTimeout(finish, 300));
  // Absolute ceiling regardless of load/RAF state.
  setTimeout(finish, 3500);
}

/* ---------- Boot ---------- */
export function boot() {
  preloader();
  initLenis();
  header();
  magnetic();
  hero();
  heroWords();
  wordScrub();
  splitReveal();
  imageReveals();
  fadeReveals();
  parallax();
  horizontalSteps();
  counters();
  glow();

  window.addEventListener('load', () => ScrollTrigger.refresh());

  // When a background tab (RAF suspended) becomes visible, re-evaluate triggers
  // so any reveal that was frozen at opacity:0 plays in.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') ScrollTrigger.refresh();
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}
