/* BuildFirst — shared page behaviours: reveal-on-scroll + drawn rules.
   Includes a "settle" pass that forces the final state shortly after each
   reveal, so content can never be left stranded by a stalled CSS transition
   (which can happen in some embedded/preview iframes). In a normal browser
   this fires after the 0.6s entrance has already completed — a no-op. */
(function(){
  function settle(el){
    el.style.setProperty('transition','none','important');
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
    setTimeout(function(){ settle(el); }, 720);
  }
  function reveals(){
    var els=[].slice.call(document.querySelectorAll('[data-reveal]'));
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
  function init(){ reveals(); }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
