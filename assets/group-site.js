'use strict';

(() => {
  const menuButton = document.querySelector('button.menu');
  const navigation = document.querySelector('header nav');

  const closeNavigation = restoreFocus => {
    if (!menuButton || !navigation || !navigation.classList.contains('open')) return;
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    if (restoreFocus) menuButton.focus();
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('open', open);
    });

    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) closeNavigation(false);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeNavigation(true);
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 851px)').matches) closeNavigation(false);
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
