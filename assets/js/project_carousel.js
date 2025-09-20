// Project Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('projectCarousel');
  const slides = document.querySelectorAll('.project-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (!carousel || slides.length === 0) return;
  
  let currentSlide = 0;
  let autoRotateInterval;
  
  // Initialize first slide as active
  slides[0].classList.add('active');
  dots[0].classList.add('active');
  
  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
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
  const prevArrow = document.querySelector('.carousel-arrow-prev');
  const nextArrow = document.querySelector('.carousel-arrow-next');
  
  if (prevArrow) {
    prevArrow.addEventListener('click', () => {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
      stopAutoRotate();
      setTimeout(startAutoRotate, 1000); // Simple 1 second pause before resuming
    });
  }
  
  if (nextArrow) {
    nextArrow.addEventListener('click', () => {
      nextSlide();
      stopAutoRotate();
      setTimeout(startAutoRotate, 1000); // Simple 1 second pause before resuming
    });
  }
  
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