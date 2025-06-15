    // Toggle Mobile Menu
    function toggleMenu() {
      const navbar = document.getElementById('navbar');
      const burgerMenu = document.querySelector('.burger-menu');
      navbar.classList.toggle('active');
      burgerMenu.classList.toggle('active');
    }

    // Scroll Animations
    function initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all animated elements
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
      });
    }

    // Smooth scrolling and header behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Header background opacity based on scroll
      if (scrollTop > 50) {
        header.style.backgroundColor = 'rgba(253, 250, 246, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.backgroundColor = 'var(--bg-color)';
        header.style.backdropFilter = 'none';
      }
      
      lastScrollTop = scrollTop;
    });

    // Initialize animations when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      initScrollAnimations();
      
      // Add stagger delay to initial elements
      const fadeElements = document.querySelectorAll('.hero .fade-in');
      fadeElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
      });
    });

    // Image hover effects with mouse tracking
    document.querySelectorAll('.content-image, .gallery-item').forEach(container => {
      const img = container.querySelector('img');
      
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        img.style.transformOrigin = `${x}% ${y}%`;
      });
      
      container.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
      });
    });


    // Effet style Riot Games/Valorant
function initRiotEffect() {
  const fullWidthImages = document.querySelectorAll('.full-width-image');
  
  fullWidthImages.forEach(container => {
    // Ajouter les éléments décoratifs
    addRiotElements(container);
    
    // Observer pour déclencher l'animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animation progressive du reveal
          let progress = 0;
          const duration = 1500; // 1.5 secondes
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            progress = Math.min(elapsed / duration, 1);
            
            // Courbe d'easing personnalisée
            const easedProgress = easeOutExpo(progress);
            
            // Mettre à jour la variable CSS
            entry.target.style.setProperty('--reveal-progress', easedProgress * 100);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Animation terminée
              entry.target.classList.add('riot-revealed');
              
              // Effet de glitch aléatoire après révélation
              setTimeout(() => {
                triggerRandomGlitch(entry.target);
              }, 2000);
            }
          };
          
          requestAnimationFrame(animate);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(container);
  });
}

// Ajouter les éléments décoratifs style Riot
function addRiotElements(container) {
  // Conteneur pour les lignes
  const linesContainer = document.createElement('div');
  linesContainer.className = 'riot-lines';
  
  // Créer les lignes dynamiques
  for (let i = 1; i <= 3; i++) {
    const line = document.createElement('div');
    line.className = `riot-line riot-line-${i}`;
    linesContainer.appendChild(line);
  }
  
  // Conteneur pour les points lumineux
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'riot-dots';
  
  // Créer les points
  for (let i = 1; i <= 3; i++) {
    const dot = document.createElement('div');
    dot.className = 'riot-dot';
    dotsContainer.appendChild(dot);
  }
  
  // Ligne de scan
  const scanLine = document.createElement('div');
  scanLine.className = 'scan-line';
  
  // Texte overlay (optionnel)
  const overlayText = document.createElement('div');
  overlayText.className = 'riot-overlay-text';
  overlayText.textContent = 'EQUIPIX'; // Vous pouvez changer ce texte
  
  // Ajouter tous les éléments
  container.appendChild(linesContainer);
  container.appendChild(dotsContainer);
  container.appendChild(scanLine);
  container.appendChild(overlayText);
}

// Fonction d'easing personnalisée
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Effet de glitch aléatoire
function triggerRandomGlitch(container) {
  const img = container.querySelector('img');
  
  // Glitch léger de temps en temps
  setInterval(() => {
    if (Math.random() < 0.1) { // 10% de chance
      img.style.animation = 'glitchEffect 0.15s ease-in-out';
      
      setTimeout(() => {
        img.style.animation = '';
      }, 150);
    }
  }, 3000);
}

// Effet de parallax subtil style Valorant pour les éléments décoratifs
function initRiotParallax() {
  const riotElements = document.querySelectorAll('.riot-lines, .riot-dots');
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    riotElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1; // Vitesses différentes
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// Effet de couleur dynamique basé sur le scroll
function initDynamicColors() {
  const images = document.querySelectorAll('.full-width-image img');
  
  let ticking = false;
  
  function updateColors() {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    
    images.forEach(img => {
      const hueShift = scrollPercent * 20; // Légère variation de teinte
      const brightness = 0.8 + (scrollPercent * 0.2); // Légère variation de luminosité
      
      img.style.filter = `brightness(${brightness}) contrast(1.2) saturate(1.1) hue-rotate(${hueShift}deg)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateColors);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialisation complète
document.addEventListener('DOMContentLoaded', () => {
  initRiotEffect();
  initRiotParallax();
  initDynamicColors();
  
  // Effet de hover amélioré
  document.querySelectorAll('.full-width-image').forEach(container => {
    container.addEventListener('mouseenter', () => {
      container.style.setProperty('--glitch-intensity', '1');
    });
    
    container.addEventListener('mouseleave', () => {
      container.style.setProperty('--glitch-intensity', '0');
    });
  });
});

// Fonction utilitaire pour redéclencher l'animation
function retriggerRiotEffect() {
  document.querySelectorAll('.full-width-image').forEach(container => {
    container.classList.remove('riot-revealed');
    container.style.setProperty('--reveal-progress', '0%');
    
    setTimeout(() => {
      container.style.setProperty('--reveal-progress', '100%');
      container.classList.add('riot-revealed');
    }, 100);
  });
}
    