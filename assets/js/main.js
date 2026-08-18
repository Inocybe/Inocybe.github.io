// Fade-in-on-scroll for homepage project rows. Skips entirely if the
// user has motion-reduction on, and un-observes each row once it's shown
// so it doesn't keep doing work after the fact.
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const targets = document.querySelectorAll('.project-row');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el) => observer.observe(el));
})();