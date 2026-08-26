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

/* Mobile family accordion (.famtoggle) — below 1025px this replaces the desktop
   sidebar tab row; each bar shows/hides the same .fam panel the sidebar tile
   controls, one open at a time. Deliberately its own listener set rather than
   folded into the [role="tab"] group above: that group's arrow-key cycling would
   otherwise reach an off-screen .famtoggle (or off-screen .vtile, on mobile) and
   flip aria-selected/hidden on a panel with no visible trigger update. */
(function () {
  var toggles = [].slice.call(document.querySelectorAll('.famtoggle'));
  function set(btn, open) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
  }
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      toggles.forEach(function (other) { if (other !== btn) set(other, false); });
      set(btn, willOpen);
    });
  });
})();

/* Category mega menus (Suspension, Brakes, Exhaust, Aero & Body, Engine &
   Turbo) — CSS :hover/:focus-within already reveal each one, so this works
   with no JS at all. This only keeps aria-expanded accurate for assistive
   tech and lets Escape close the open one and return focus to its trigger. */
(function () {
  var items = [].slice.call(document.querySelectorAll('.subnav__item'));
  items.forEach(function (item) {
    var link = item.querySelector('.subnav__link');
    var mega = item.querySelector('.mega');
    if (!link || !mega) return;
    function open() { link.setAttribute('aria-expanded', 'true'); }
    function close() { link.setAttribute('aria-expanded', 'false'); }
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    item.addEventListener('focusin', open);
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) close();
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { close(); link.focus(); }
    });
  });
})();

/* Carousel arrows — Videos and Blog both use .vids__carousel; right-only at
   the start, scrolling right reveals the left arrow, reaching the end hides
   the right one. One listener set per .vids__carousel found, not one hardcoded
   #id, since there are two of these on the page now. */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var carousels = [].slice.call(document.querySelectorAll('.vids__carousel'));
  carousels.forEach(function (carousel) {
    var track = carousel.querySelector('.vids__grid');
    var prev = carousel.querySelector('.vids__arrow--prev');
    var next = carousel.querySelector('.vids__arrow--next');
    if (!track || !prev || !next) return;

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.hidden = track.scrollLeft <= 4;
      next.hidden = track.scrollLeft >= max - 4;
    }
    function scrollByCard(dir) {
      var card = track.querySelector('li');
      var amount = card ? card.getBoundingClientRect().width + 18 : track.clientWidth * 0.9;
      track.scrollBy({ left: dir * amount, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    prev.addEventListener('click', function () { scrollByCard(-1); });
    next.addEventListener('click', function () { scrollByCard(1); });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();
