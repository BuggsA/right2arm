// "Where are you starting?" picker: shows one path at a time.
// Without JavaScript all three paths stay visible, stacked.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.picker [role="tab"]'));
  if (!tabs.length) return;

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      select(tab);
      history.replaceState(null, '', '#' + tab.dataset.path);
      // On phones the choices fill the screen, so bring the chosen path into view.
      if (window.matchMedia('(max-width: 820px)').matches) {
        document.getElementById(tab.getAttribute('aria-controls')).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    tab.addEventListener('keydown', function (e) {
      var next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[(next + tabs.length) % tabs.length], true);
    });
  });

  // Deep links such as /#renew open that path.
  var fromHash = tabs.filter(function (t) { return '#' + t.dataset.path === location.hash; })[0];
  select(fromHash || tabs[0]);
})();
