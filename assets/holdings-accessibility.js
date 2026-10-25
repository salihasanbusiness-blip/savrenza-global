(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.getElementById('primary-nav');
  const toggle = document.getElementById('menu-toggle');
  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? 'Close' : 'Menu';
  };
  if (menu && toggle) {
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      setOpen(false);
      if (link.hash && link.pathname === location.pathname) {
        const section = document.getElementById(link.hash.slice(1));
        if (section) { section.tabIndex = -1; section.focus({ preventScroll: true }); }
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', (event) => { if (!event.target.closest('header')) setOpen(false); });
    matchMedia('(min-width: 761px)').addEventListener('change', () => setOpen(false));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
