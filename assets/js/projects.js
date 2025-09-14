/* ===== Robotics Projects — v2 behavior ===== */
(function(){
  const shell = document.getElementById('projects-shell');
  if(!shell) return;

  const listEl   = document.getElementById('projects-list');
  const railEl   = document.getElementById('projects-rail');
  const detailEl = document.getElementById('project-detail');
  const detailScroll = document.getElementById('detail-scroll');
  const backBtn  = document.getElementById('detail-back');
  const maskEl   = document.getElementById('projects-mask');

  /* Show ONLY thumbnails + detail while focused */
  const FULL_MODE = true;

  let LIST_SCROLL_Y = 0;   // put this near the top file (global)

  /* --- measure the navbar and set CSS var so nothing overlaps it --- */
  function setNavOffset(){
    const nav = document.querySelector('nav.navbar-custom') || document.querySelector('nav.navbar');
    let top = 72;
    if(nav){
      const rect = nav.getBoundingClientRect();
      // Use the visible bottom (accounts for any shrink-on-scroll)
      top = Math.max(rect.bottom, nav.offsetHeight);
    }
    document.documentElement.style.setProperty('--nav-offset', `${Math.ceil(top)}px`);
  }

  function onReady(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(syncMediaHeights);
  window.addEventListener('load', syncMediaHeights);
  window.addEventListener('resize', () => { syncMediaHeights(); }); 
  
  onReady(setNavOffset);
  window.addEventListener('load', setNavOffset);
  window.addEventListener('resize', setNavOffset);
  // navbar height can change on scroll (theme shrinks), so debounce updates
  let t; window.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(setNavOffset, 120); });

  /* --- open detail panel and load detail page content --- */
  async function openDetail(url, id){
    LIST_SCROLL_Y = window.scrollY || window.pageYOffset || 0;   // <- remember where we were
    document.documentElement.classList.add('projects-focused');
    if(FULL_MODE) document.documentElement.classList.add('projects-focused-full');

    try{
      const res = await fetch(url, { credentials:'same-origin' });
      const html = await res.text();
      const tmp = document.createElement('div'); tmp.innerHTML = html;
      const content = tmp.querySelector('#project-content') || tmp.querySelector('main') || tmp;
      detailScroll.innerHTML = '';
      detailScroll.appendChild(content.cloneNode(true));
      detailScroll.scrollTop = 0;

      // highlight active thumb
      if(railEl){
        railEl.querySelectorAll('.rail-item').forEach(n => n.classList.remove('active'));
        const active = railEl.querySelector(`.rail-item[data-id="${id}"]`);
        if(active) active.classList.add('active');
      }

      history.pushState({ projId:id, projUrl:url }, '', url);
    }catch(e){
      // graceful fallback
      window.location.href = url;
    }
  }

  /* --- close detail panel --- */
  function closeDetail(){
    document.documentElement.classList.remove('projects-focused', 'projects-focused-full');
    detailScroll.innerHTML = '';
    const base = shell.getAttribute('data-base') || '/robotics-projects/';
    history.pushState({}, '', base);

    // Restore scroll to where user clicked Read more
    requestAnimationFrame(() => {
      window.scrollTo({ top: LIST_SCROLL_Y, left: 0, behavior: 'auto' });
    });

    // re-sync heights in case layout changed
    requestAnimationFrame(syncMediaHeights);
  }

  function syncMediaHeights(){
    // Only do this on desktop; mobile uses CSS clamp above
    const desktop = window.matchMedia('(min-width: 992px)').matches;
    const maxH = parseInt(getComputedStyle(document.documentElement)
                .getPropertyValue('--media-max-h')) || 320;

    document.querySelectorAll('.proj-row').forEach(row => {
      const media = row.querySelector('.proj-media');
      const body  = row.querySelector('.proj-body');
      if(!media || !body) return;

      if(!desktop){
        media.style.height = '';     // let the CSS clamp take over
        return;
      }
      // Match the text height, but never exceed --media-max-h
      const target = Math.min(body.offsetHeight, maxH);
      media.style.height = target + 'px';
    });
  }

  /* Read more buttons (ajax mode) */
  listEl.addEventListener('click', e => {
    const btn = e.target.closest('.proj-readmore');
    if(!btn) return;
    if(btn.getAttribute('data-ajax') !== 'true') return; // normal link
    e.preventDefault();
    openDetail(btn.getAttribute('href'), btn.getAttribute('data-id'));
  });

  /* Rail click: switch project */
  if(railEl){
    railEl.addEventListener('click', e => {
      const itm = e.target.closest('.rail-item'); if(!itm) return;
      const id = itm.getAttribute('data-id');
      const btn = listEl.querySelector(`.proj-readmore[data-id="${id}"]`);
      if(btn) openDetail(btn.getAttribute('href'), id);
    });
  }

  /* Keyboard open: Enter/Space on a focused thumbnail */
  if (railEl) {
    railEl.addEventListener('keydown', (e) => {
      const itm = e.target.closest('.rail-item');
      if (!itm) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id  = itm.getAttribute('data-id');
        const btn = listEl.querySelector(`.proj-readmore[data-id="${id}"]`);
        if (btn) openDetail(btn.getAttribute('href'), id);
      }
    });
  }

  /* Mask click closes */
  maskEl.addEventListener('click', closeDetail);

  /* Back button + Esc */
  backBtn.addEventListener('click', closeDetail);
  window.addEventListener('keydown', e => {
    if(e.key === 'Escape' && document.documentElement.classList.contains('projects-focused')) closeDetail();
  });

  /* Browser back */
  window.addEventListener('popstate', e => {
    if(document.documentElement.classList.contains('projects-focused') && (!e.state || !e.state.projId)){
      closeDetail();
    }
  });
})();
