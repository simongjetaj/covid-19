const counters = document.querySelectorAll('.counter');
const speed = 80;

counters.forEach((counter) => {
  const updateCount = () => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const count = +counter.innerText;
    const inc = Math.round(target / speed);

    if (count < target) {
      counter.innerText = count + inc;
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target ? target.toLocaleString() : target || 0;
    }
  };

  updateCount();
});

(function () {
  'use strict';

  function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('top-show');
    }

    if (scrolled < coords) {
      goTopBtn.classList.remove('top-show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  const goTopBtn = document.querySelector('.top');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();
