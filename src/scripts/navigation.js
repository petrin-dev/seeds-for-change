// ─── NAV SCROLL STATE ────────────────────────────────────────────────────────
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────
const toggle  = document.querySelector('.nav-toggle');
const menu    = document.getElementById('nav-mobile');
const iconMenu  = toggle?.querySelector('.icon-menu');
const iconClose = toggle?.querySelector('.icon-close');

toggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  if (iconMenu)  iconMenu.style.display  = isOpen ? 'none'  : '';
  if (iconClose) iconClose.style.display = isOpen ? ''      : 'none';
});

// Close menu when a mobile nav link is clicked
menu?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation menu');
    if (iconMenu)  iconMenu.style.display  = '';
    if (iconClose) iconClose.style.display = 'none';
  });
});
