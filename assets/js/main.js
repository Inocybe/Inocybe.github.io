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




// parrax background function and spawning trees
(function () {
  const trees = document.querySelector('.bg-trees');
  const mountain = document.querySelector('.bg-mountain');

  if (!trees || !mountain) return;

  const preferseReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TREE_START_OFFSET = 60;  // TUNE: % hidden below the fold at rest (0 = fully visible immediately)
  const TREE_MAX_RISE = 400;     // TUNE: px of scroll needed to fully reveal the trees
  const MOUNTAIN_SPEED = 0.08;   // TUNE: 0 = mountain stays perfectly still; higher = more drift

  if (preferseReducedMotion) {
    // If the user has motion-reduction on, just show the trees and don't move the mountain.
    trees.style.transform = 'translateY(0)';
    return;
  }

  let ticking = false;

  function update() {
    const progress = Math.min(window.scrollY / TREE_MAX_RISE, 1);
    const treeOffset = (1 - progress) * TREE_START_OFFSET;
    trees.style.transform = `translateY(${treeOffset}%)`;
    
    if (mountain) {
      mountain.style.transform = `translateY(-50%, ${-(window.scrollY * MOUNTAIN_SPEED)}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, {passive: true});


  update();  // Initial call to set positions based on initial scroll position
}());