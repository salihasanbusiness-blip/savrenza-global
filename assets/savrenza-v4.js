'use strict';

(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  fetch('/assets/locale-routes.json', { cache: 'force-cache', headers: { Accept: 'application/json' } })
    .then(response => {
      if (!response.ok) throw new Error(`Locale route configuration returned HTTP ${response.status}.`);
      return response.json();
    })
    .then(config => {
      const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
      const publishedRoute = Object.entries(config.locales || {}).find(([, locale]) =>
        locale.status === 'published' && (locale.path.replace(/\/+$/, '') || '/') === pathname
      );
      if (!publishedRoute) return;
      document.documentElement.lang = publishedRoute[0];
      document.documentElement.dir = publishedRoute[1].direction;
    })
    .catch(error => console.error('SAVRENZA locale routing could not initialize.', error));

  const closeNavigation = restoreFocus => {
    if (!menuButton || !navigation || menuButton.getAttribute('aria-expanded') !== 'true') return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
    if (restoreFocus) menuButton.focus();
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      navigation.classList.toggle('open', open);
    });

    navigation.addEventListener('click', event => {
      if (event.target instanceof Element && event.target.closest('a')) closeNavigation(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeNavigation(true);
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 821px)').matches) closeNavigation(false);
    });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.documentElement.classList.add('motion-ready');
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }

  const form = document.querySelector('#inquiry-form');
  const status = document.querySelector('#form-status');
  if (!form || !status) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;

    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const company = String(fields.get('company') || '').trim();
    const subjectType = String(fields.get('inquiry-type') || 'Business enquiry');
    const area = String(fields.get('area') || '').trim();
    const message = String(fields.get('message') || '').trim();
    const subject = `${subjectType} — ${name}`.slice(0, 160);
    const body = [
      `Name: ${name}`,
      `Business email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Area of interest: ${area || 'Not specified'}`,
      '',
      message,
    ].join('\n');
    const draftUrl = `mailto:info@savrenzaplatform.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = 'Your email application should open with a draft. The website has not sent or stored your message; review and send the draft, or email info@savrenzaplatform.com directly.';
    window.location.href = draftUrl;
  });
})();
