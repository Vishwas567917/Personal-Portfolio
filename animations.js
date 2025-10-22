// ============================================
// animations.js - Add this file to your project!
// ============================================
// Link it in your HTML: <script src="scripts/animations.js"></script>

document.addEventListener("DOMContentLoaded", function () {
  
  // ========== 1. CURSOR GLOW EFFECT ==========
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,0,128,0.8), transparent);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = (e.clientX - 10) + 'px';
    cursorGlow.style.top = (e.clientY - 10) + 'px';
  });

  // Enlarge on hover
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorGlow.style.transform = 'scale(3)';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(106,17,203,0.6), transparent)';
    });
    el.addEventListener('mouseleave', () => {
      cursorGlow.style.transform = 'scale(1)';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(255,0,128,0.8), transparent)';
    });
  });

  // ========== 2. FLOATING PARTICLES IN HERO ==========
  const hero = document.querySelector('.home-hero');
  if (hero) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: white;
        border-radius: 50%;
        opacity: ${Math.random() * 0.5 + 0.3};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
      `;
      hero.appendChild(particle);
    }
  }

  // Add floating animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      25% {
        transform: translate(20px, -20px) scale(1.2);
      }
      50% {
        transform: translate(-20px, -40px) scale(0.8);
      }
      75% {
        transform: translate(-10px, -20px) scale(1.1);
      }
    }
  `;
  document.head.appendChild(style);

  // ========== 3. SCROLL PROGRESS BAR ==========
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #6a11cb, #ff0080);
    width: 0%;
    z-index: 10000;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(255,0,128,0.8);
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ========== 4. SCROLL ANIMATIONS FOR SECTIONS ==========
  function isInViewport(element, offset = 0.15) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 - offset) &&
      rect.bottom >= 0
    );
  }

  // Animate About Section
  const aboutSection = document.querySelector('.about-section');
  const aboutPhoto = document.querySelector('.about-photo');
  const aboutText = document.querySelector('.about-text');
  
  if (aboutPhoto && aboutText) {
    aboutPhoto.style.opacity = '0';
    aboutPhoto.style.transform = 'translateX(-100px)';
    aboutPhoto.style.transition = 'all 1s ease';
    
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateX(100px)';
    aboutText.style.transition = 'all 1s ease';
  }

  // Animate Project Cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotateX(20deg)';
    card.style.transition = 'all 0.8s ease';
  });

  // Animate Skills
  const skills = document.querySelectorAll('.skill');
  skills.forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'scale(0.8)';
    skill.style.transition = 'all 0.6s ease';
  });

  // Scroll handler
  function handleScrollAnimations() {
    // About Section
    if (aboutSection && isInViewport(aboutSection)) {
      if (aboutPhoto && aboutPhoto.style.opacity === '0') {
        setTimeout(() => {
          aboutPhoto.style.opacity = '1';
          aboutPhoto.style.transform = 'translateX(0)';
        }, 200);
      }
      if (aboutText && aboutText.style.opacity === '0') {
        setTimeout(() => {
          aboutText.style.opacity = '1';
          aboutText.style.transform = 'translateX(0)';
        }, 400);
      }
    }

    // Project Cards
    projectCards.forEach((card, index) => {
      if (isInViewport(card) && card.style.opacity === '0') {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) rotateX(0)';
        }, index * 200);
      }
    });

    // Skills
    skills.forEach((skill, index) => {
      if (isInViewport(skill) && skill.style.opacity === '0') {
        setTimeout(() => {
          skill.style.opacity = '1';
          skill.style.transform = 'scale(1)';
          
          // Animate skill bar
          const skillBar = skill.querySelector('.skill-bar-fill');
          if (skillBar) {
            setTimeout(() => {
              skillBar.classList.add('fill');
            }, 300);
          }
        }, index * 100);
      }
    });
  }

  // Run on scroll
  window.addEventListener('scroll', handleScrollAnimations);
  handleScrollAnimations(); // Run once on load

  // ========== 5. PROJECT CARD TILT EFFECT ==========
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ========== 6. SKILL ICON ROTATE ON HOVER ==========
  skills.forEach(skill => {
    const icon = skill.querySelector('.skill-icon');
    if (icon) {
      skill.addEventListener('mouseenter', () => {
        icon.style.transform = 'rotateY(360deg)';
        icon.style.transition = 'transform 0.6s ease';
      });
      skill.addEventListener('mouseleave', () => {
        icon.style.transform = 'rotateY(0deg)';
      });
    }
  });

  // ========== 7. TYPING EFFECT FOR HERO TEXT ==========
  const heroTitle = document.querySelector('.home-hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    setTimeout(typeWriter, 500);
  }

  // ========== 8. SMOOTH NAVBAR ACTIVE STATE ==========
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section, header');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ========== 9. PARTICLE CLICK EFFECT ==========
  document.addEventListener('click', (e) => {
    // Don't create particles on button/link clicks
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
    
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: ${['#6a11cb', '#ff0080', '#fff'][Math.floor(Math.random() * 3)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
      `;
      document.body.appendChild(particle);
      
      const angle = (Math.PI * 2 * i) / 10;
      const velocity = 2 + Math.random() * 2;
      let x = e.clientX;
      let y = e.clientY;
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity;
      let opacity = 1;
      
      function animateParticle() {
        x += vx;
        y += vy;
        vy += 0.1; // gravity
        opacity -= 0.02;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animateParticle);
        } else {
          particle.remove();
        }
      }
      
      animateParticle();
    }
  });

  // ========== 10. CONTACT FORM ANIMATION ==========
  const contactForm = document.querySelector('.contact-form-wrapper form');
  const formGroups = document.querySelectorAll('.form-group');
  
  if (contactForm) {
    formGroups.forEach((group, index) => {
      group.style.opacity = '0';
      group.style.transform = 'translateX(-30px)';
      group.style.transition = 'all 0.5s ease';
    });
    
    const contactSection = document.querySelector('.contact-section');
    
    window.addEventListener('scroll', () => {
      if (isInViewport(contactSection)) {
        formGroups.forEach((group, index) => {
          setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateX(0)';
          }, index * 150);
        });
      }
    });
  }

  // ========== 11. SOCIAL ICONS BOUNCE ==========
  const socialIcons = document.querySelectorAll('.social-icons a');
  socialIcons.forEach((icon, index) => {
    icon.style.animation = `bounce 0.6s ease ${index * 0.1}s`;
  });

  // Add bounce animation
  const bounceStyle = document.createElement('style');
  bounceStyle.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(bounceStyle);

  // ========== 12. BUTTON RIPPLE EFFECT ==========
  const buttons = document.querySelectorAll('.btn, button, .project-buttons a');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  console.log('🎉 Animations loaded! Your portfolio is now LEGENDARY!');
});