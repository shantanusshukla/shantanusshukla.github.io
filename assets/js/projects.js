(function () {
  const shell    = document.getElementById('projects-shell');
  if (!shell) return;

  const listEl   = document.getElementById('projects-list');
  const railEl   = document.getElementById('projects-rail');
  const detailEl = document.getElementById('project-detail');
  const detailScroll = document.getElementById('detail-scroll');
  const backBtn  = document.getElementById('detail-back');
  const maskEl   = document.getElementById('projects-mask');

  /* ---- config: set to true if you want ONLY thumbnails + detail visible ---- */
  const FULL_MODE = false;

  /* ---- measure navbar height and set CSS var ---- */
  function setNavHeightVar() {
    const nav = document.querySelector('nav.navbar') || document.querySelector('.navbar-custom');
    const h   = nav ? nav.offsetHeight : 64;
    document.documentElement.style.setProperty('--nav-h', h + 'px');
  }
  setNavHeightVar();
  window.addEventListener('resize', setNavHeightVar);
  // nav height can change on scroll (theme shrinks it)
  let t; window.addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(setNavHeightVar, 120); });

  /* ---- open detail (ajax) ---- */
  async function openDetail(url, id) {
    document.documentElement.classList.add('projects-focused');
    if (FULL_MODE) document.documentElement.classList.add('projects-focused-full');

    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      const html = await res.text();
      const tmp  = document.createElement('div'); tmp.innerHTML = html;
      const content = tmp.querySelector('#project-content') || tmp.querySelector('main') || tmp;
      detailScroll.innerHTML = '';
      detailScroll.appendChild(content.cloneNode(true));
      detailScroll.scrollTop = 0;

      // highlight in rail
      if (railEl) {
        railEl.querySelectorAll('.rail-item').forEach(n => n.classList.remove('active'));
        const active = railEl.querySelector(`.rail-item[data-id="${id}"]`);
        if (active) active.classList.add('active');
      }

      history.pushState({ projId: id, projUrl: url }, '', url);
    } catch (e) {
      // fallback
      window.location.href = url;
    }
  }

  /* ---- close detail ---- */
  function closeDetail() {
    document.documentElement.classList.remove('projects-focused', 'projects-focused-full');
    detailScroll.innerHTML = '';
    // go back to listing URL (from data-base on the shell)
    const base = shell.getAttribute('data-base') || '/robotics-projects/';
    history.pushState({}, '', base);
  }

  /* read more buttons */
  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.proj-readmore');
    if (!btn) return;
    const ajax = btn.getAttribute('data-ajax');
    if (ajax !== 'true') return; // normal navigation
    e.preventDefault();
    const url = btn.getAttribute('href');
    const id  = btn.getAttribute('data-id');
    openDetail(url, id);
  });

  /* rail: click to switch project */
  if (railEl) {
    railEl.addEventListener('click', (e) => {
      const itm = e.target.closest('.rail-item');
      if (!itm) return;
      const id = itm.getAttribute('data-id');
      const btn = listEl.querySelector(`.proj-readmore[data-id="${id}"]`);
      if (btn) openDetail(btn.getAttribute('href'), id);
    });
  }

  /* mask: click outside closes */
  maskEl.addEventListener('click', closeDetail);

  /* back button + Esc */
  backBtn.addEventListener('click', closeDetail);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.documentElement.classList.contains('projects-focused')) {
      closeDetail();
    }
  });

  /* handle browser back */
  window.addEventListener('popstate', (e) => {
    if (document.documentElement.classList.contains('projects-focused') && (!e.state || !e.state.projId)) {
      closeDetail();
    }
  });
})();