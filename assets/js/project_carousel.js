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
    autoRotateInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
  }
  
  // Function to stop auto rotation
  function stopAutoRotate() {
    clearInterval(autoRotateInterval);
  }
  
  // Add click handlers to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopAutoRotate();
      setTimeout(startAutoRotate, 2000); // Restart auto rotation after 2 seconds
    });
  });
  
  // Add click handlers to slides for "read more" functionality
  slides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      // Only trigger if not clicking on the title link
      if (!e.target.closest('.project-title-link')) {
        // Find the project title link and use its href
        const projectTitleLink = slide.querySelector('.project-title-link');
        if (projectTitleLink) {
          window.location.href = projectTitleLink.href;
        }
      }
    });
  });
  
  // Pause auto rotation on hover
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);
  
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