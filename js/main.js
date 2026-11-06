document.querySelectorAll('a[href="#research"]').forEach(function(link){link.addEventListener('click',function(){document.getElementById('research-details').open=true;});});
if(location.hash==='#research'){document.getElementById('research-details').open=true;}
(function(){
  var section=document.getElementById('impact');
  var counters=Array.from(section.querySelectorAll('[data-count]'));
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches || !('IntersectionObserver' in window)) return;
  var started=false;
  var observer=new IntersectionObserver(function(entries){
    if(started || !entries.some(function(entry){return entry.isIntersecting;})) return;
    started=true;observer.disconnect();
    var start=null,duration=1600;
    counters.forEach(function(el){el.textContent='0'+(el.dataset.suffix||'');});
    function frame(now){
      if(start===null) start=now;
      var progress=reduced.matches?1:Math.min((now-start)/duration,1);
      var eased=1-Math.pow(1-progress,3);
      counters.forEach(function(el){el.textContent=Math.round(Number(el.dataset.count)*eased)+(el.dataset.suffix||'');});
      if(progress<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  },{threshold:0.2});
  observer.observe(section);
})();

// 2026-11-06: phone menu + bottom Give / Get involved bar.
(function(){
  var toggle=document.getElementById('menuToggle'), menu=document.getElementById('mobileMenu');
  if(toggle&&menu){
    function close(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');}
    toggle.addEventListener('click',function(){var open=menu.hidden;menu.hidden=!open;toggle.setAttribute('aria-expanded',open?'true':'false');});
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',close);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
  var bar=document.getElementById('mobileGive'), hero=document.querySelector('.hero'), give=document.getElementById('give'), involved=document.getElementById('get-involved');
  if(bar&&hero&&give&&'IntersectionObserver' in window){
    var heroIn=true, giveIn=false;
    function update(){var show=!heroIn&&!giveIn;bar.classList.toggle('is-visible',show);bar.setAttribute('aria-hidden',show?'false':'true');bar.querySelectorAll('a').forEach(function(a){a.tabIndex=show?0:-1;});}
    new IntersectionObserver(function(e){heroIn=e[0].isIntersecting;update();}).observe(hero);
    // Hide the bar while either the Give or the Get involved section is on screen.
    var seen={};
    new IntersectionObserver(function(entries){entries.forEach(function(e){seen[e.target.id]=e.isIntersecting;});giveIn=!!(seen.give||seen['get-involved']);update();}).observe(give);
    if(involved) new IntersectionObserver(function(entries){entries.forEach(function(e){seen[e.target.id]=e.isIntersecting;});giveIn=!!(seen.give||seen['get-involved']);update();}).observe(involved);
    update();
  } else if(bar){bar.classList.add('is-visible');}
})();
