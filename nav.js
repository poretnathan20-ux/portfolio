/* ═══════════════════════════════════════════
   nav.js — Script partagé (Nathan Poret)
   • Lien actif automatique
   • Animations reveal au scroll
   • Barres de compétences animées
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Lien actif selon la page courante ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === page ||
        (page === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 2. Animations au scroll (IntersectionObserver) ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.cv-section, .project-card, .theme-card, .outil-card, .news-card, .comp-card, .recto-card, .pro-section'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = Math.min(i * 0.06, 0.4) + 's';
    revealObserver.observe(el);
  });

  /* ── 3. Animation des barres de compétences ── */
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { fill.style.width = target; }, 80);
        });
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.bar-fill').forEach(el => barObserver.observe(el));

});
