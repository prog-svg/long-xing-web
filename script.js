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

const menuTabs = [...document.querySelectorAll('[data-category]')];
const menuPanels = [...document.querySelectorAll('[data-panel]')];

function showMenuCategory(category, updateAddress = true) {
  if (!menuTabs.some((tab) => tab.dataset.category === category)) return;

  menuTabs.forEach((tab) => {
    const active = tab.dataset.category === category;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  menuPanels.forEach((panel) => {
    const active = panel.dataset.panel === category;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });

  if (updateAddress) history.replaceState(null, '', `#${category}`);
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showMenuCategory(tab.dataset.category));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    const step = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const next = menuTabs[(index + step + menuTabs.length) % menuTabs.length];
    showMenuCategory(next.dataset.category);
    next.focus();
  });
});

if (menuTabs.length) {
  const requestedCategory = location.hash.slice(1);
  const hasRequestedCategory = menuTabs.some((tab) => tab.dataset.category === requestedCategory);
  showMenuCategory(hasRequestedCategory ? requestedCategory : 'platillos', false);
  if (hasRequestedCategory) {
    requestAnimationFrame(() => {
      document.querySelector('.menu-explorer')?.scrollIntoView({ block: 'start' });
      requestAnimationFrame(() => document.querySelector('.menu-tab.is-active')?.scrollIntoView({ block: 'nearest', inline: 'center' }));
    });
  }
  addEventListener('hashchange', () => showMenuCategory(location.hash.slice(1), false));
}
