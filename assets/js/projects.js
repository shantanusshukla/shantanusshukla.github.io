(function () {
  const shell = document.getElementById('projects-shell');
  if (!shell) return;

  const listEl   = document.getElementById('projects-list');
  const railEl   = document.getElementById('projects-rail');
  const detailEl = document.getElementById('project-detail');
  const detailScroll = document.getElementById('detail-scroll');
  const backBtn  = document.getElementById('detail-back');

  // Enter focus mode: load detail content into the side panel
  async function openDetail(url, id) {
    document.documentElement.classList.add('projects-focused');

    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      const html = await res.text();
      const tmp = document.createElement('div');
      tmp.innerHTML = html;

      // Extract only the project article
      const content = tmp.querySelector('#project-content') || tmp.querySelector('main') || tmp;
      detailScroll.innerHTML = '';
      detailScroll.appendChild(content.cloneNode(true));

      // Scroll top of detail
      detailScroll.scrollTop = 0;

      // Highlight rail item
      if (railEl) {
        railEl.querySelectorAll('.rail-item').forEach(n => n.classList.remove('active'));
        const active = railEl.querySelector(`.rail-item[data-id="${id}"]`);
        if (active) active.classList.add('active');
      }

      // Push state for back/forward support
      history.pushState({ projId: id, projUrl: url }, '', url);
    } catch (e) {
      console.error('Failed to load project detail:', e);
      window.location.href = url; // graceful fallback
    }
  }

  function closeDetail() {
    document.documentElement.classList.remove('projects-focused');
    detailScroll.innerHTML = '';
    // Restore URL to the listing page without reloading
    const base = window.location.pathname.replace(/\/projects\/robotics\/[^/]+\/?$/, '/robotics-projects/');
    history.pushState({}, '', base);
  }

  // Click handlers: Read more buttons
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

  // Rail click (thumbnail selects)
  if (railEl) {
    railEl.addEventListener('click', (e) => {
      const itm = e.target.closest('.rail-item');
      if (!itm) return;
      const id = itm.getAttribute('data-id');
      const btn = listEl.querySelector(`.proj-readmore[data-id="${id}"]`);
      if (btn) {
        const url = btn.getAttribute('href');
        openDetail(url, id);
      }
    });
  }

  // Back button
  backBtn.addEventListener('click', closeDetail);

  // Browser back/forward
  window.addEventListener('popstate', (e) => {
    if (document.documentElement.classList.contains('projects-focused') && (!e.state || !e.state.projId)) {
      // Went back to listing
      closeDetail();
    }
  });
})();