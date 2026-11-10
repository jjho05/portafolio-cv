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

  /* ==========================================================================
     INTERACTIVOS CYBERNETIC BENTO & SANDBOXES (ESTILO SONY / MAXIME HECKEL / SAMSY)
     ========================================================================== */

  /* ---------- 1. Terminal Interactiva Bento ---------- */
  function initInteractiveTerminal() {
    const term = $('#terminalOutput');
    const chips = $$('.terminal-chips .t-chip');
    if (!term || !chips.length) return;

    const initialHtml = term.innerHTML;

    function addLine(text, isHighlight = false, isDim = false) {
      const p = document.createElement('p');
      p.className = 't-line' + (isDim ? ' dim' : '') + (isHighlight ? ' highlight' : '');
      p.innerHTML = text;
      term.appendChild(p);
      term.scrollTop = term.scrollHeight;
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (typeof window.playClickSound === 'function') window.playClickSound(640, 0.04);

        if (cmd === 'clear') {
          term.innerHTML = initialHtml;
          return;
        }

        if (cmd === 'pulse') {
          if (typeof window.boost3DScene === 'function') {
            window.boost3DScene(2.0);
          }
          addLine('<span class="t-prompt">&gt;</span> <span class="accent-text">DISPARO_DE_PULSO:</span> Inyectando energía a 170 nodos y anillos orbitales... <span style="color:#22c55e;">[OK: 100% Sincronizado]</span>');
        } else if (cmd === 'hackathon') {
          addLine('<span class="t-prompt">&gt;</span> <span class="accent-text">CERTAMEN:</span> 1er Lugar Hackatón IEST Anáhuac 2026');
          addLine('&gt; <span class="dim">Proyecto galardonado: BloodCare — Red Bi-LSTM cuantificada con Pinball Loss</span>', false, true);
          addLine('&gt; <span class="dim">Desplazando hacia la sección de Trayectoria...</span>', false, true);
          const careerSec = document.getElementById('career');
          if (careerSec) {
            setTimeout(() => {
              careerSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 350);
          }
        } else if (cmd === 'stack') {
          addLine('<span class="t-prompt">&gt;</span> <span class="accent-text">NÚCLEO TECNOLÓGICO:</span>');
          addLine('&gt; <span class="dim">[IA]: PyTorch, CUDA, Gemini 2.0 Flash/Pro, Claude 3.7 Sonnet, DeepSeek</span>', false, true);
          addLine('&gt; <span class="dim">[Web & Sistemas]: TypeScript, Node.js, Three.js, Python, Supabase, Tailwind, Docker</span>', false, true);
        } else if (cmd === 'whoami') {
          addLine('<span class="t-prompt">&gt;</span> <span class="accent-text">IDENTIDAD:</span> Jesús Javier Hernández Olvera');
          addLine('&gt; <span class="dim">Rol: Software Architect & AI Systems Engineer</span>', false, true);
          addLine('&gt; <span class="dim">Ubicación: Tampico, Tamaulipas, MX (UTC-6)</span>', false, true);
          addLine('&gt; <span class="dim">Enfoque: Sistemas agénticos autónomos, Deep Learning probabilístico y visión edge.</span>', false, true);
        }
      });
    });
  }

  /* ---------- 2. Live Geo-Clock (Tampico Local Time) ---------- */
  function initLiveGeoClock() {
    const clockEl = $('#geoLiveClock');
    if (!clockEl) return;

    function update() {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('es-MX', {
          timeZone: 'America/Monterrey',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        clockEl.textContent = `${timeStr} UTC-6`;
      } catch (e) {
        const d = new Date();
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hh}:${mm}:${ss} UTC-6`;
      }
    }
    update();
    setInterval(update, 1000);
  }

  /* ---------- 3. BloodCare Interactive Sandbox (Bi-LSTM + Pinball Loss) ---------- */
  function initBloodCareSandbox() {
    const slider = $('#bloodCareSlider');
    const horizonVal = $('#bloodCareHorizonVal');
    const predLine = $('#bloodPredictionLine');
    const confArea = $('#bloodConfidenceArea');
    const pointsGroup = $('#bloodPointsGroup');
    if (!slider || !horizonVal || !predLine || !confArea) return;

    // Puntos históricos fijos (t-4, t-3, t-2, t-1, t=0)
    const history = [
      { x: 25, y: 88 },
      { x: 75, y: 78 },
      { x: 125, y: 94 },
      { x: 175, y: 70 },
      { x: 220, y: 76 }, // Punto actual (t=0)
    ];

    function renderCurve(minutes) {
      horizonVal.textContent = `${minutes} min`;

      // Proyección hacia adelante según los minutos seleccionados (15 a 120 min)
      // Mapeo horizontal de 220px a 475px
      const targetX = 220 + ((minutes - 15) / 105) * 255;

      // Simulación de dinámica glucémica suave
      const steps = 14;
      const forecastPts = [];
      for (let i = 0; i <= steps; i++) {
        const p = i / steps;
        const curX = 220 + p * (targetX - 220);
        // Oscilación fisiológica predicha por Bi-LSTM
        const curY = 76 - Math.sin(p * Math.PI * 1.2) * 24 + p * 6;
        // Intervalo de incertidumbre Pinball (cuantiles 5% y 95%) que se ensancha con el tiempo
        const spread = 7 + (p * (minutes / 120) * 32);
        forecastPts.push({ x: curX, y: curY, upper: curY - spread, lower: curY + spread });
      }

      // 1. Línea completa (historia + predicción)
      let lineD = `M ${history[0].x} ${history[0].y}`;
      for (let i = 1; i < history.length; i++) {
        lineD += ` L ${history[i].x} ${history[i].y}`;
      }
      for (let i = 0; i < forecastPts.length; i++) {
        lineD += ` L ${forecastPts[i].x.toFixed(1)} ${forecastPts[i].y.toFixed(1)}`;
      }
      predLine.setAttribute('d', lineD);

      // 2. Área de banda de confianza Pinball Loss
      let areaD = `M ${forecastPts[0].x.toFixed(1)} ${forecastPts[0].upper.toFixed(1)}`;
      for (let i = 1; i < forecastPts.length; i++) {
        areaD += ` L ${forecastPts[i].x.toFixed(1)} ${forecastPts[i].upper.toFixed(1)}`;
      }
      for (let i = forecastPts.length - 1; i >= 0; i--) {
        areaD += ` L ${forecastPts[i].x.toFixed(1)} ${forecastPts[i].lower.toFixed(1)}`;
      }
      areaD += ' Z';
      confArea.setAttribute('d', areaD);

      // 3. Puntos SVG
      if (pointsGroup) {
        let ptsHtml = '';
        history.forEach((pt) => {
          ptsHtml += `<circle cx="${pt.x}" cy="${pt.y}" r="3" fill="var(--text-3)"/>`;
        });
        const currentPt = history[history.length - 1];
        ptsHtml += `<circle cx="${currentPt.x}" cy="${currentPt.y}" r="4.5" fill="var(--accent)"/>`;
        const endPt = forecastPts[forecastPts.length - 1];
        ptsHtml += `<circle cx="${endPt.x.toFixed(1)}" cy="${endPt.y.toFixed(1)}" r="4.5" fill="#38bdf8"/>`;
        pointsGroup.innerHTML = ptsHtml;
      }
    }

    slider.addEventListener('input', (e) => {
      renderCurve(parseInt(e.target.value, 10));
      if (typeof window.playClickSound === 'function') window.playClickSound(700, 0.02);
    });

    renderCurve(parseInt(slider.value, 10));
  }

  /* ---------- 4. EcoEye Interactive Sandbox (WiFi CSI Radar Simulation) ---------- */
  function initEcoEyeSandbox() {
    const area = $('#rfRadarArea');
    const canvas = $('#rfRadarCanvas');
    const statusText = $('#rfStatusText');
    if (!area || !canvas || !statusText) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = 500;
    let height = canvas.height = 140;

    let disturbance = 0;
    let targetDisturbance = 0;
    let pointerX = width / 2;
    let pointerY = height / 2;
    let time = 0;

    function resize() {
      const r = area.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.round(r.width || 500);
      height = Math.round(r.height || 140);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    area.addEventListener('pointermove', (e) => {
      const r = area.getBoundingClientRect();
      pointerX = e.clientX - r.left;
      pointerY = e.clientY - r.top;
      targetDisturbance = 1;
    });

    area.addEventListener('pointerleave', () => {
      targetDisturbance = 0;
    });

    function draw() {
      time += 0.04;
      disturbance += (targetDisturbance - disturbance) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Estado del tema para colores de ondas
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const baseAlpha = isLight ? 0.35 : 0.45;

      // Actualizar estado del badge según perturbación
      if (disturbance > 0.35) {
        statusText.innerHTML = '<span style="color:#ef4444;"><i class="fa-solid fa-person-walking"></i> PERTURBACIÓN ACTIVA [HUMANO: 99.4%]</span>';
      } else {
        statusText.innerHTML = 'ESPECTRO ESTABLE (SIN MOVIMIENTO)';
        statusText.style.color = '';
      }

      // Dibujar cuadrícula de fondo tenue
      ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      const stepX = 40;
      for (let x = 0; x < width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Dibujar 3 subportadoras OFDM de radiofrecuencia (WiFi CSI)
      const subcarriers = [
        { freq: 0.024, speed: 2.2, amp: 16, color: isLight ? 'rgba(15,23,42,' : 'rgba(200,245,66,' },
        { freq: 0.045, speed: -2.8, amp: 11, color: isLight ? 'rgba(2,132,199,' : 'rgba(56,189,248,' },
        { freq: 0.016, speed: 1.5, amp: 20, color: isLight ? 'rgba(79,70,229,' : 'rgba(168,85,247,' },
      ];

      subcarriers.forEach((sc, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = `${sc.color}${baseAlpha + (idx === 0 ? 0.3 : 0)})`;
        ctx.lineWidth = idx === 0 ? 2 : 1.5;

        for (let x = 0; x <= width; x += 3) {
          const midY = height / 2;
          let wave = Math.sin(x * sc.freq + time * sc.speed) * sc.amp;

          if (disturbance > 0.02) {
            const dist = Math.abs(x - pointerX);
            const ripple = Math.sin(dist * 0.12 - time * 8) * Math.exp(-dist * 0.018) * (disturbance * 28);
            wave += ripple;
          }

          const y = midY + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      // Si hay perturbación activa, dibujar marcador en la posición del puntero
      if (disturbance > 0.1) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 18 * disturbance, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239, 68, 68, ${disturbance * 0.7})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pointerX, pointerY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.restore();
      }

      if (!reduceMotion) {
        requestAnimationFrame(draw);
      }
    }

    if (!reduceMotion) {
      requestAnimationFrame(draw);
    }
  }

  /* ---------- 5. Neural HUD Controller ---------- */
  function initNeuralHudDock() {
    const dock = $('#neuralHudDock');
    const toggleBtn = $('#hudToggleBtn');
    const panel = $('#hudPanel');
    const closeBtn = $('#hudCloseBtn');
    const pulseBtn = $('#hudPulseBtn');
    const speedBtn = $('#hudSpeedBtn');
    const fpsLabel = $('.hud-fps-label');
    if (!dock || !toggleBtn || !panel) return;

    toggleBtn.addEventListener('click', () => {
      panel.classList.toggle('open');
      if (typeof window.playClickSound === 'function') window.playClickSound(640, 0.04);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
        if (typeof window.playClickSound === 'function') window.playClickSound(420, 0.03);
      });
    }

    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        if (typeof window.boost3DScene === 'function') window.boost3DScene(2.2);
        if (typeof window.playClickSound === 'function') window.playClickSound(920, 0.08);
        const orig = pulseBtn.innerHTML;
        pulseBtn.innerHTML = '<i class="fa-solid fa-bolt" style="color:var(--accent);"></i> ¡PULSO ENVIADO!';
        setTimeout(() => { pulseBtn.innerHTML = orig; }, 900);
      });
    }

    if (speedBtn) {
      speedBtn.addEventListener('click', () => {
        const isWarp = typeof window.toggle3DWarpSpeed === 'function' ? window.toggle3DWarpSpeed() : false;
        if (typeof window.playClickSound === 'function') window.playClickSound(isWarp ? 780 : 500, 0.05);
        speedBtn.classList.toggle('active', isWarp);
        speedBtn.innerHTML = isWarp
          ? '<i class="fa-solid fa-forward-fast" style="color:var(--accent);"></i> Warp 3.2x [ACTIVO]'
          : '<i class="fa-solid fa-forward-fast"></i> Alternar Velocidad (Warp)';
      });
    }

    // Monitor ligero de FPS en el HUD
    if (fpsLabel && !reduceMotion) {
      let frames = 0;
      let lastTime = performance.now();
      function updateFps(now) {
        frames++;
        if (now - lastTime >= 1000) {
          const fps = Math.round((frames * 1000) / (now - lastTime));
          fpsLabel.textContent = `${fps} FPS`;
          frames = 0;
          lastTime = now;
        }
        requestAnimationFrame(updateFps);
      }
      requestAnimationFrame(updateFps);
    }
  }

  /* ---------- 6. 3D Card Tilt sutil en Bento y Sandboxes ---------- */
  function init3DCardTilt() {
    if (reduceMotion || !finePointer) return;
    const cards = $$('.bento-card, .sandbox-card');
    cards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Inicializar componentes interactivos
  initInteractiveTerminal();
  initLiveGeoClock();
  initBloodCareSandbox();
  initEcoEyeSandbox();
  initNeuralHudDock();
  init3DCardTilt();

  /* ---------- Idioma inicial en <html lang> ---------- */
  if (window.i18n) document.documentElement.lang = window.i18n.currentLang;

  /* ---------- Soporte / Compatibilidad con Swarm Rebuild ---------- */
  function initSwarmCompatibility() {
    function enableSwarmMode() {
      document.documentElement.classList.add('swarm-active');
      $$('.reveal').forEach((el) => {
        el.classList.add('in');
        $$('[data-count]', el).forEach((num) => {
          if (num.dataset.count) num.textContent = num.dataset.count;
        });
      });
    }

    function disableSwarmMode() {
      document.documentElement.classList.remove('swarm-active');
    }

    // Observar inyección y remoción de <swarm-rebuild> en el DOM
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === 1 && node.nodeName.toLowerCase() === 'swarm-rebuild') {
            enableSwarmMode();
            return;
          }
        }
        for (const node of m.removedNodes) {
          if (node.nodeType === 1 && node.nodeName.toLowerCase() === 'swarm-rebuild') {
            disableSwarmMode();
            return;
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true });

    if (document.querySelector('swarm-rebuild')) {
      enableSwarmMode();
    }
  }
  initSwarmCompatibility();
})();
