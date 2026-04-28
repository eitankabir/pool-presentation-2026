const Slides = (() => {
  let current = 0;
  let total = 0;

  function init() {
    const allSlides = document.querySelectorAll('.slide');
    total = allSlides.length;
    if (total === 0) return;

    goTo(0, false);
    _updateUI();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown')  next();
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp')   prev();
    });
  }

  function next() {
    if (current < total - 1) goTo(current + 1);
  }

  function prev() {
    if (current > 0) goTo(current - 1);
  }

  function goTo(index, animate = true) {
    const allSlides = document.querySelectorAll('.slide');
    if (index < 0 || index >= total) return;

    if (animate && allSlides[current]) {
      allSlides[current].classList.add('exit');
      allSlides[current].classList.remove('active');
      setTimeout(() => allSlides[current]?.classList.remove('exit'), 400);
    } else if (allSlides[current]) {
      allSlides[current].classList.remove('active');
    }

    current = index;
    allSlides[current].classList.add('active');
    _updateUI();
    setTimeout(() => _animateCounters(allSlides[current]), 360);

    if (typeof Charts !== 'undefined') Charts.onSlideChange(current);
  }

  function _animateCounters(slideEl) {
    slideEl.querySelectorAll('[data-count]').forEach(el => {
      el.classList.remove('counted');
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(eased * target).toLocaleString('he-IL') + suffix;
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          el.classList.add('counted');
        }
      }
      requestAnimationFrame(tick);
    });
  }

  function _updateUI() {
    const counter = document.getElementById('slide-counter');
    const progress = document.getElementById('progress');

    if (counter) counter.textContent = `${current + 1} / ${total}`;
    if (progress) progress.style.width = `${((current + 1) / total) * 100}%`;
  }

  function getCurrent() { return current; }
  function getTotal()   { return total; }

  return { init, next, prev, goTo, getCurrent, getTotal };
})();
