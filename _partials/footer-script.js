<script>
/* Footer columns are <details open> so they work without JS. On phones the
   mobile frame shows them collapsed, so close them there and keep it in sync. */
(function () {
  var mq = window.matchMedia('(max-width: 900px)');
  var cols = document.querySelectorAll('.foot__col');
  function sync() { for (var i = 0; i < cols.length; i++) cols[i].open = !mq.matches; }
  sync();
  mq.addEventListener ? mq.addEventListener('change', sync) : mq.addListener(sync);
})();

/* Vehicle-family tabs — the left rail selects which marque list is shown. */
(function () {
  var tabs = [].slice.call(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;
  function select(tab, moveFocus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
    if (moveFocus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var k = e.key, next = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (k === 'ArrowUp' || k === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (k === 'Home') next = tabs[0];
      else if (k === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      e.preventDefault();
      select(next, true);
    });
  });
})();

/* Marque disclosure — each card (.acard--toggle) opens its own panel
   (Figma 1383:8579 / 1617:39532) in place under that card. */
(function () {
  var toggles = [].slice.call(document.querySelectorAll('.acard--toggle'));
  function set(btn, open) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  }
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      /* one at a time — five panels open at once buries the list */
      toggles.forEach(function (other) { if (other !== btn) set(other, false); });
      set(btn, willOpen);
    });
  });
})();
</script>
