// Shrinks the hanging logo back into the menu bar once the page is scrolled.
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function update() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
