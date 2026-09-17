/* Stan Schekall site script. Replaces the demo script.js (which throws on missing plugins). */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function hideLoader() {
    var l = $('.loader');
    if (l) { l.style.transition = 'opacity .4s'; l.style.opacity = '0'; setTimeout(function () { l.style.display = 'none'; }, 450); }
  }
  if (document.readyState === 'complete') hideLoader(); else window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 3000);

  var nav = $('#ss-nav'), top = $('#ss-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('ss-scrolled', y > 20);
    if (top) top.classList.toggle('ss-show', y > 600);
    var cur = '';
    $$('main section[id]').forEach(function (s) { if (s.getBoundingClientRect().top <= 120) cur = s.id; });
    $$('.ss-links a').forEach(function (a) { a.classList.toggle('ss-active', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menu = $('#ss-menu'), burger = $('#ss-burger'), closeBtn = $('#ss-menu-close');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('ss-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && closeBtn) closeBtn.focus();
  }
  if (burger) burger.addEventListener('click', function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setMenu(false); });
  $$('#ss-menu a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  var yr = $('#ss-year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
