/* ============================================================
   ella chen — portfolio scripts
   three small jobs: mobile menu, active-link highlight, scroll reveal
   ============================================================ */

// ---------- 1. mobile menu toggle ----------
const toggle = document.getElementById('navToggle');
const menu   = document.getElementById('navMenu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// close the menu after tapping a link (on mobile)
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- 2. highlight the nav link for the section you're viewing ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = menu.querySelectorAll('a');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => spy.observe(section));

// ---------- 3. fade sections in as they scroll into view ----------
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => revealer.observe(el));
} else {
  // older browser: just show everything
  revealItems.forEach(el => el.classList.add('is-visible'));
}
