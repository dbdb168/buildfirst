// BuildFirst site: mobile menu and header rule on scroll. Nothing else moves.
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// The AI Cookbook: fill [data-cookbook] lists from the live Substack feed (/api/cookbook).
// The cards baked into the page stay if the feed is slow or empty.
(function () {
  var lists = document.querySelectorAll('[data-cookbook]');
  if (!lists.length || !window.fetch) return;
  var esc = function (s) { return String(s || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  fetch('/api/cookbook?limit=8', { headers: { accept: 'application/json' } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      var posts = d && d.posts;
      if (!posts || !posts.length) return;
      lists.forEach(function (el) {
        var n = parseInt(el.getAttribute('data-cookbook'), 10) || 4;
        el.innerHTML = posts.slice(0, n).map(function (p) {
          var u = /^https:\/\/[a-z0-9.-]*substack\.com\//i.test(p.link) ? p.link : 'https://theaicookbook.substack.com';
          return '<a class="post" href="' + esc(u) + '"><div class="label">' + esc(p.date || 'Post') + '</div><h3>' + esc(p.title) + '</h3></a>';
        }).join('');
      });
    })
    .catch(function () {});
})();
