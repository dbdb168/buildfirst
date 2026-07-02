/* BuildFirst — shared page behaviours: reveal-on-scroll (gently staggered),
   drawn rules, a scrolled-nav state, and a "settle" pass that forces the final
   state shortly after each reveal, so content can never be left stranded by a
   stalled CSS transition (which can happen in some embedded/preview iframes).
   In a normal browser the settle fires after the entrance has already
   completed — a no-op. All motion respects prefers-reduced-motion. */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function settle(el){
    el.style.setProperty('transition','none','important');
    el.style.setProperty('transition-delay','0s','important');
    el.style.setProperty('opacity','1','important');
    el.style.setProperty('transform','none','important');
    var rules = el.querySelectorAll ? el.querySelectorAll('.rule') : [];
    [].forEach.call(rules, function(r){
      r.style.setProperty('transition','none','important');
      r.style.setProperty('transform','none','important');
    });
  }
  function reveal(el){
    el.classList.add('in');
    // Generous enough to let a staggered entrance (delay + duration) finish.
    setTimeout(function(){ settle(el); }, 950);
  }

  /* Give grouped items a gentle cascade by staggering their transition-delay. */
  function stagger(els){
    if(reduce) return;
    els.forEach(function(el){
      var parent = el.parentNode;
      if(!parent) return;
      var sibs = [].filter.call(parent.children, function(c){
        return c.nodeType === 1 && c.hasAttribute && c.hasAttribute('data-reveal');
      });
      if(sibs.length < 2) return;
      var i = sibs.indexOf(el);
      var d = Math.min(i * 55, 220);
      if(d > 0) el.style.transitionDelay = d + 'ms';
    });
  }

  function reveals(){
    var els=[].slice.call(document.querySelectorAll('[data-reveal]'));
    stagger(els);
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target); } });
      },{threshold:.12, rootMargin:'0px 0px -6% 0px'});
      els.forEach(function(el){ io.observe(el); });
    } else { els.forEach(function(el){ reveal(el); }); }
    // first-paint reveal for the above-the-fold hero
    requestAnimationFrame(function(){
      document.querySelectorAll('.phero [data-reveal], .phero .rule').forEach(function(el){ reveal(el); });
    });
    // hard safety: never leave anything hidden
    setTimeout(function(){
      els.forEach(function(el){ settle(el); });
      document.querySelectorAll('.rule').forEach(function(r){
        r.style.setProperty('transition','none','important');
        r.style.setProperty('transform','none','important');
      });
    }, 2400);
  }

  /* Soften the nav once the page has scrolled a touch. */
  function navState(){
    var nav=document.querySelector('nav');
    if(!nav) return;
    var apply=function(){ nav.classList.toggle('scrolled', (window.scrollY || window.pageYOffset || 0) > 8); };
    apply();
    window.addEventListener('scroll', apply, {passive:true});
  }

  function init(){ reveals(); navState(); }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
