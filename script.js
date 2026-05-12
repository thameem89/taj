document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav-mobile-menu a');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 72; // Nav height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.section-label, .section-title, .section-desc, .foods-hero-split, .channel-card, .other-div-card, .about-content > *, .about-img, .cta-banner > *');
  
  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });

  // Contact Form Submission (Mock)
  const submitBtn = document.querySelector('.form-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.target;
      const originalText = btn.innerText;
      btn.innerText = 'Sending...';
      btn.style.opacity = '0.7';
      
      setTimeout(() => {
        btn.innerText = 'Message Sent!';
        btn.style.backgroundColor = '#1a6b3a'; // Green success
        btn.style.opacity = '1';
        
        // Reset form
        const inputs = document.querySelectorAll('.contact-form-wrap input, .contact-form-wrap textarea, .contact-form-wrap select');
        inputs.forEach(input => input.value = '');

        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = ''; // Revert to original CSS class background
        }, 3000);
      }, 1500);
    });
  }

  // Mobile Dropdown Toggle
  const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
  const mobileDropdownMenu = document.querySelector('.mobile-dropdown-menu');
  if (mobileDropdownToggle && mobileDropdownMenu) {
    mobileDropdownToggle.addEventListener('click', () => {
      mobileDropdownMenu.classList.toggle('open');
      mobileDropdownToggle.classList.toggle('open');
    });
  }
});
