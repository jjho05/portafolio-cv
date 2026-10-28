// Theme Engine: Automatic System Sync + Manual Toggle (Dark / Light / Auto)
(function () {
  const STORAGE_KEY = 'preferred-theme';
  const toggleBtn = document.getElementById('themeToggle');
  let transitionTimer = null;

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function getSavedTheme() {
    const urlParam = new URLSearchParams(window.location.search).get('theme');
    if (urlParam === 'light' || urlParam === 'dark') return urlParam;
    return localStorage.getItem(STORAGE_KEY) || 'auto';
  }

  function updateIcon(theme, effectiveTheme) {
    if (!toggleBtn) return;
    const icon = toggleBtn.querySelector('i');
    if (!icon) return;

    // Micro-animación suave en el icono
    icon.style.transform = 'scale(0.7) rotate(180deg)';
    icon.style.opacity = '0.4';

    setTimeout(() => {
      if (theme === 'auto') {
        icon.className = 'fas fa-circle-half-stroke';
        toggleBtn.setAttribute('title', 'Tema: Sistema');
      } else if (effectiveTheme === 'dark') {
        icon.className = 'fas fa-moon';
        toggleBtn.setAttribute('title', 'Tema: Oscuro');
      } else {
        icon.className = 'fas fa-sun';
        toggleBtn.setAttribute('title', 'Tema: Claro');
      }
      icon.style.transform = 'scale(1) rotate(0deg)';
      icon.style.opacity = '1';
    }, 120);
  }

  function applyTheme(theme, animate = true) {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    const currentTheme = document.documentElement.getAttribute('data-theme');

    const updateDOM = () => {
      document.documentElement.setAttribute('data-theme', effectiveTheme);
      document.documentElement.style.colorScheme = effectiveTheme;
      updateIcon(theme, effectiveTheme);
    };

    // Si ya está aplicado y solo cambia icono
    if (currentTheme === effectiveTheme && document.documentElement.style.colorScheme === effectiveTheme) {
      updateIcon(theme, effectiveTheme);
      return;
    }

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Si es la carga inicial o el usuario prefiere movimiento reducido: cambio instantáneo
    if (!animate || prefersReduced) {
      updateDOM();
      return;
    }

    // View Transitions API (Chrome 111+, Safari 18+, Edge)
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        updateDOM();
      });
      return;
    }

    // Fallback con clase de transición CSS (Firefox, Safari < 18)
    document.documentElement.classList.add('theme-transitioning');
    updateDOM();
    if (transitionTimer) clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 450);
  }

  function cycleTheme() {
    const current = getSavedTheme();
    let next = 'dark';
    if (current === 'auto') next = 'dark';
    else if (current === 'dark') next = 'light';
    else if (current === 'light') next = 'auto';

    if (next === 'auto') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next, true);
  }

  // Initial apply: SIN animación para evitar parpadeos (FOUC)
  applyTheme(getSavedTheme(), false);

  // Listen for OS theme changes if user has 'auto'
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (getSavedTheme() === 'auto') {
        applyTheme('auto', true);
      }
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', cycleTheme);
  }
})();
