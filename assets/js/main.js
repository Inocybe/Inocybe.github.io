// fade in affect for project rows
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
  const isMobile = window.matchMedia('(max-width: 760px)').matches;

  const TREE_START_OFFSET = 50;  
  const TREE_MAX_RISE = 300;     
  const TREE_RISE_SPEED = 0.7;
  const MOUNTAIN_SPEED = 0.08;  

  if (preferseReducedMotion || isMobile) {
    return;
  }

  let ticking = false;

  function update() {
    const progress = Math.min(window.scrollY / TREE_MAX_RISE * TREE_RISE_SPEED, 1);
    const treeOffset = (1 - progress) * TREE_START_OFFSET;
    trees.style.transform = `translateY(${treeOffset}%)`;
    
    if (mountain) {
      mountain.style.transform = `translateY(${-(window.scrollY * MOUNTAIN_SPEED)}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, {passive: true});


  update();
}());