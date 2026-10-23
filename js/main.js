/* ==========================================================================
   Comportamiento de la página
   - Hero: palabras con entrada escalonada
   - Reveals por IntersectionObserver + contadores animados
   - Header sólido, barra de progreso, scroll-spy, menú móvil
   - Filtros de proyectos, spotlight por mouse, cursor
   - Globales usados por botones inline: toggleLanguage, copyEmail
   ========================================================================== */
(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

  /* ---------- Globales inline ---------- */
  window.toggleLanguage = function () {
    if (window.i18n) window.i18n.toggle();
  };

  window.copyEmail = async function (btn) {
    const email = 'jjho.reivaj05@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Fallback para contextos sin Clipboard API
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* sin acción posible */ }
      ta.remove();
    }
    const span = btn && btn.querySelector('span');
    if (!span) return;
    const i18n = window.i18n;
    const copied = i18n && i18n.translations && i18n.translations[i18n.currentLang]
      ? i18n.translations[i18n.currentLang].contact.copied
      : 'Copiado';
    const original = span.textContent;
    span.textContent = copied;
    setTimeout(() => {
      // Si cambió el idioma mientras tanto, i18n ya reescribió el texto; restaurar vía la clave
      span.textContent = i18n ? i18n.t('contact.copyBtn') : original;
    }, 2000);
  };

  /* ---------- Hero ---------- */

  /* ---------- Reveals + contadores ---------- */
  function countUp(el) {
    const end = parseInt(el.getAttribute('data-count'), 10);
    if (Number.isNaN(end)) return;
    if (reduceMotion) { el.textContent = String(end); return; }
    const dur = 1200;
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  function observeReveals() {
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          $$('[data-count]', en.target).forEach(countUp);
          io.unobserve(en.target);
        });
      }, { threshold: 0.02, rootMargin: '50px 0px 50px 0px' })
      : null;

    $$('.reveal').forEach((el) => {
      const idx = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--d', Math.min(idx, 6) * 55 + 'ms');
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        // Ya está visible en viewport inicial
        el.classList.add('in');
        $$('[data-count]', el).forEach(countUp);
      } else if (io) {
        io.observe(el);
      } else {
        el.classList.add('in');
      }
    });
  }
  observeReveals();

  /* ---------- Header, progreso, scroll-spy ---------- */
  const header = $('#header');
  const bar = $('#progressBar');
  const links = $$('.nav-link');
  const sections = ['about', 'career', 'credentials', 'projects', 'lab', 'stack', 'contact']
    .map((id) => document.getElementById(id)).filter(Boolean);

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    if (header) header.classList.toggle('solid', y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar && max > 0) bar.style.width = (y / max) * 100 + '%';

    let current = '';
    const probe = y + window.innerHeight * 0.35;
    sections.forEach((s) => { if (s.offsetTop <= probe) current = s.id; });
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Menú móvil ---------- */
  const navToggle = $('#navToggle');
  const navMenu = $('#navMenu');
  function setMenu(open) {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', String(open));
    const icon = $('i', navToggle);
    if (icon) icon.className = open ? 'fas fa-xmark' : 'fas fa-bars';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (navToggle) navToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('active')));
  links.forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) setMenu(false); });

  /* ---------- Filtros de proyectos ---------- */
  const filterBar = $('#projectFilters');
  const list = $('#projectList');
  const shown = $('#projShown');
  if (filterBar && list) {
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', filterBar).forEach((b) => b.classList.toggle('active', b === btn));
      const f = btn.getAttribute('data-filter');
      let n = 0;
      $$('#projectList > li').forEach((li) => {
        const cats = (li.getAttribute('data-cats') || '').split(/\s+/);
        const show = f === 'all' || cats.includes(f);
        li.classList.toggle('is-hidden', !show);
        if (show) n++;
      });
      if (shown) shown.textContent = String(n);
    });
  }

  /* ---------- Filtros de cursos ---------- */
  const courseFilterBar = $('#courseFilters');
  const courseList = $('#coursesList');
  const courseShown = $('#courseShown');
  if (courseFilterBar && courseList) {
    courseFilterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', courseFilterBar).forEach((b) => b.classList.toggle('active', b === btn));
      const f = btn.getAttribute('data-filter');
      let n = 0;
      $$('#coursesList > li').forEach((li) => {
        const cats = (li.getAttribute('data-cats') || '').split(/\s+/);
        const show = f === 'all' || cats.includes(f);
        li.classList.toggle('is-hidden', !show);
        if (show) n++;
      });
      if (courseShown) courseShown.textContent = String(n);
    });
  }

  /* ---------- Spotlight bajo el mouse (delegado: el contenido es dinámico) ---------- */
  document.addEventListener('pointermove', (e) => {
    const spot = e.target.closest && e.target.closest('.spot');
    if (!spot) return;
    const r = spot.getBoundingClientRect();
    spot.style.setProperty('--mx', e.clientX - r.left + 'px');
    spot.style.setProperty('--my', e.clientY - r.top + 'px');
  }, { passive: true });

  /* ---------- Cursor ---------- */
  const cursor = $('#cursor');
  if (cursor && finePointer && !reduceMotion) {
    let cx = 0, cy = 0, tx = 0, ty = 0, started = false;
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      if (!started) { cx = tx; cy = ty; started = true; cursor.classList.add('on'); }
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('on'));
    document.addEventListener('pointerenter', () => { if (started) cursor.classList.add('on'); });
    (function move() {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(move);
    })();
    document.addEventListener('pointerover', (e) => {
      cursor.classList.toggle('hover', !!(e.target.closest && e.target.closest('a, button, .p-row:not(.is-static)')));
    });
  }

  /* ---------- Idioma inicial en <html lang> ---------- */
  if (window.i18n) document.documentElement.lang = window.i18n.currentLang;
})();
