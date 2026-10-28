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

  function triggerThemeTransition() {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    document.documentElement.classList.add('theme-transition');
    if (transitionTimer) clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 550);
  }

  function applyTheme(theme, animate = false) {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    if (animate) triggerThemeTransition();
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.style.colorScheme = effectiveTheme;
    updateIcon(theme, effectiveTheme);
  }

  function cycleTheme() {
    const current = getSavedTheme();
    let next = 'dark';
    if (current === 'auto') {
      next = getSystemTheme() === 'dark' ? 'light' : 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else if (current === 'light') {
      next = 'auto';
    }

    if (next === 'auto') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next, true);
  }

  // Initial apply: sin animar para evitar parpadeos
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
