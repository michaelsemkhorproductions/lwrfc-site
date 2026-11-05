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
