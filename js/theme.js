// Theme Engine: Automatic System Sync + Manual Toggle (Dark / Light / Auto)
(function () {
  const STORAGE_KEY = 'preferred-theme';
  const toggleBtn = document.getElementById('themeToggle');

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

  function applyTheme(theme) {
    const effectiveTheme = theme === 'auto' ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.style.colorScheme = effectiveTheme;

    if (toggleBtn) {
      const icon = toggleBtn.querySelector('i');
      if (icon) {
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
      }
    }
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
    applyTheme(next);
  }

  // Initial apply
  applyTheme(getSavedTheme());

  // Listen for OS theme changes if user has 'auto'
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (getSavedTheme() === 'auto') {
        applyTheme('auto');
      }
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', cycleTheme);
  }
})();
