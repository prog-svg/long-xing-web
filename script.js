const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

toggle?.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menú');
  });
});
