// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('projectCarousel');
  const slides = document.querySelectorAll('.project-slide');
  
  if (!carousel || slides.length === 0) return;
  
  let currentSlide = 0;
  let autoRotateInterval;
  
  // Initialize first slide as active
  slides[0].classList.add('active');
  
  // ===== ALL PROJECTS POPUP FUNCTIONALITY =====
  const openAllProjectsBtn = document.getElementById('openAllProjectsBtn');
  const closeAllProjectsBtn = document.getElementById('closeAllProjectsBtn');
  const allProjectsOverlay = document.getElementById('allProjectsOverlay');
  const projectGridTiles = document.querySelectorAll('.project-grid-tile');
  
  // Open all projects popup
  if (openAllProjectsBtn && allProjectsOverlay) {
    openAllProjectsBtn.addEventListener('click', function() {
      allProjectsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Pause carousel auto-rotation when popup is open
      clearInterval(autoRotateInterval);
    });
  }
  
  // Close all projects popup
  function closeAllProjectsPopup() {
    if (allProjectsOverlay) {
      allProjectsOverlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
      
      // Resume carousel auto-rotation
      startAutoRotate();
    }
  }
  
  // Close button
  if (closeAllProjectsBtn) {
    closeAllProjectsBtn.addEventListener('click', closeAllProjectsPopup);
  }
  
  // Close when clicking outside the container
  if (allProjectsOverlay) {
    allProjectsOverlay.addEventListener('click', function(e) {
      if (e.target === allProjectsOverlay) {
        closeAllProjectsPopup();
      }
    });
  }
  
  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && allProjectsOverlay && allProjectsOverlay.classList.contains('active')) {
      closeAllProjectsPopup();
    }
  });
  
  // Handle project tile clicks
  projectGridTiles.forEach(tile => {
    tile.addEventListener('click', function() {
      const projectUrl = this.getAttribute('data-project-url');
      if (projectUrl) {
        // Store that we came from the carousel page
        sessionStorage.setItem('returnToCarousel', 'true');
        // Navigate to project page
        window.location.href = projectUrl;
      }
    });
  });
  
  // Check if we're returning from a project page
  if (sessionStorage.getItem('returnToCarousel') === 'true') {
    // Remove the flag
    sessionStorage.removeItem('returnToCarousel');
    
    // Scroll to the carousel section
    setTimeout(() => {
      const carouselSection = document.querySelector('.project-carousel-section');
      if (carouselSection) {
        carouselSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  }
  
  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Add active class to current slide
    slides[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Function to go to next slide
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  // Function to start auto rotation
  function startAutoRotate() {
    autoRotateInterval = setInterval(nextSlide, 6000); // Slowed down to 6 seconds
  }
  
  // Function to stop auto rotation
  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }
  
  // Add click handlers to navigation arrows
  document.addEventListener('click', function(e) {
    if (e.target.closest('.carousel-arrow-prev')) {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
      stopAutoRotate();
      setTimeout(startAutoRotate, 1000);
    }
    
    if (e.target.closest('.carousel-arrow-next')) {
      nextSlide();
      stopAutoRotate();
      setTimeout(startAutoRotate, 1000);
    }
  });
  
  // Add click handlers to slides for "read more" functionality
  slides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      // Only trigger if not clicking on the title link
      if (!e.target.closest('.project-title-link')) {
        const projectId = slide.dataset.projectId;
        window.location.href = `/projects/robotics/${projectId}/`;
      }
    });
  });
  
  // Pause auto rotation on hover, resume with fixed timing when leaving
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', () => {
    // Simply restart with fixed timing, no "catch up" logic
    startAutoRotate();
  });
  
  // Start auto rotation
  startAutoRotate();
  
  // Handle visibility change (pause when tab is not active)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });
});