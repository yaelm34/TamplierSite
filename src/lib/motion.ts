// ============================================================
//  MOTION ENGINE — Lenis smooth-scroll + GSAP ScrollTrigger
//  Every effect degrades gracefully under prefers-reduced-motion.
// ============================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

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
    lerp: 0.08,
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
        scrub: true,
      },
    });
  });
}

/* ---------- 6. Hero cinematic ---------- */
function hero() {
  const heroEl = document.querySelector<HTMLElement>('[data-hero]');
  if (!heroEl || reduced) return;
  const media = heroEl.querySelector<HTMLElement>('[data-hero-media]');
  const overlay = heroEl.querySelector<HTMLElement>('[data-hero-overlay]');
  if (media) {
    gsap.to(media, {
      scale: 1.14,
      duration: 20,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
  }
  gsap.to(heroEl, {
    scale: 0.94,
    yPercent: 6,
    ease: 'none',
    scrollTrigger: {
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
  if (overlay) {
    gsap.to(overlay, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
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

/* ---------- 9. Header scroll state ---------- */
function header() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 'top -60',
    end: 99999,
    onUpdate: (self) => {
      header.setAttribute('data-scrolled', self.direction === 1 || window.scrollY > 60 ? 'true' : 'false');
      if (window.scrollY > 60) header.setAttribute('data-scrolled', 'true');
      else header.setAttribute('data-scrolled', 'false');
    },
  });
}

/* ---------- 10. Mouse-follow glow ---------- */
function glow() {
  if (reduced || isTouch) return;
  document.querySelectorAll<HTMLElement>('.glow-follow').forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener('pointermove', (e) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty('--gx', `${e.clientX - r.left}px`);
      el.style.setProperty('--gy', `${e.clientY - r.top}px`);
      el.style.setProperty('--go', '1');
    });
    parent.addEventListener('pointerleave', () => el.style.setProperty('--go', '0'));
  });
}

/* ---------- 11. Custom magnetic cursor ---------- */
function cursor() {
  if (reduced || isTouch) return;
  const dot = document.querySelector<HTMLElement>('.cursor-dot');
  const ring = document.querySelector<HTMLElement>('.cursor-ring');
  if (!dot || !ring) return;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { ...mouse };
  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
  gsap.ticker.add(() => {
    ringPos.x += (mouse.x - ringPos.x) * 0.18;
    ringPos.y += (mouse.y - ringPos.y) * 0.18;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
  });

  document
    .querySelectorAll<HTMLElement>('a, button, [data-magnetic]')
    .forEach((el) => {
      el.addEventListener('pointerenter', () => ring.classList.add('is-active'));
      el.addEventListener('pointerleave', () => {
        ring.classList.remove('is-active');
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
      });
      if (el.hasAttribute('data-magnetic')) {
        el.addEventListener('pointermove', (e) => {
          const r = el.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          gsap.to(el, { x: mx * 0.25, y: my * 0.35, duration: 0.6, ease: 'power3.out' });
        });
      }
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
  cursor();
  hero();
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
