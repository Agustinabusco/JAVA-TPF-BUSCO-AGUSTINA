(() => {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('navegaTheme');
  if (savedTheme === 'dark' || savedTheme === 'light') html.dataset.theme = savedTheme;

  const themeBtn = document.querySelector('[data-theme-toggle]');
  const updateThemeIcon = () => {
    if (!themeBtn) return;
    const dark = html.dataset.theme === 'dark';
    themeBtn.textContent = dark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
    themeBtn.title = dark ? 'Modo claro' : 'Modo oscuro';
  };
  updateThemeIcon();

  themeBtn?.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('navegaTheme', next);
    updateThemeIcon();
  });

  const nav = document.querySelector('.site-nav');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  menuBtn?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(Boolean(open)));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }));

  const page = document.body.dataset.module;
  if (page && page !== 'inicio') {
    const visited = JSON.parse(localStorage.getItem('navegaVisited') || '[]');
    if (!visited.includes(page)) {
      visited.push(page);
      localStorage.setItem('navegaVisited', JSON.stringify(visited));
    }
  }

  const modules = ['contrasenas', 'phishing', 'desafio', 'opinion'];
  const visited = JSON.parse(localStorage.getItem('navegaVisited') || '[]');
  const count = modules.filter(m => visited.includes(m)).length;
  const pct = Math.round((count / modules.length) * 100);
  document.querySelectorAll('[data-progress-bar]').forEach(el => el.style.width = `${pct}%`);
  document.querySelectorAll('[data-progress-text]').forEach(el => el.textContent = `${count} de ${modules.length} módulos visitados`);
  document.querySelectorAll('[data-progress-percent]').forEach(el => el.textContent = `${pct}%`);

  document.querySelectorAll('[data-reset-progress]').forEach(btn => btn.addEventListener('click', () => {
    localStorage.removeItem('navegaVisited');
    localStorage.removeItem('navegaQuizBest');
    location.reload();
  }));

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
