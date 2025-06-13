// Titre animé, chaque lettre séparée, rapide et fluide
function animateTitle() {
  const h1 = document.querySelector('h1');
  if (!h1) return;
  const text = h1.textContent;
  h1.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'letter';
    h1.appendChild(span);
    setTimeout(() => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    }, 18 * i + 80); // plus fluide et rapide
  });
}

// Texte animé 
// 
// Animation douce des textes au scroll (hors titre)
function animateTextOnScroll() {
  const rows = document.querySelectorAll('.row');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const textContent = entry.target.querySelector('.text-content');
        if (textContent) {
          textContent.style.opacity = 1;
          textContent.style.transform = 'translateY(0)';
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  rows.forEach(row => {
    const textContent = row.querySelector('.text-content');
    if (textContent) {
      textContent.style.opacity = 0;
      textContent.style.transform = 'translateY(24px)';
      textContent.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)';
    }
    observer.observe(row);
  });
}

document.addEventListener('DOMContentLoaded', animateTextOnScroll);


// Animation au scroll pour images et textes
function initScrollAnimations() {
  const rows = document.querySelectorAll('.row');
  const maquetteBoxes = document.querySelectorAll('.maquette-box');
  const button = document.querySelector('.btn');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Images
        const img = entry.target.querySelector('.image-content img');
        if (img && !img.classList.contains('visible')) {
          img.classList.add('visible');
          // Texte après image
          const txt = entry.target.querySelector('.text-content');
          if (txt) setTimeout(() => animateTextCascade(txt), 80);
        } else {
          // Texte direct si pas d'image
          const txt = entry.target.querySelector('.text-content');
          if (txt) animateTextCascade(txt);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  rows.forEach(row => observer.observe(row));

  // Maquette-boxes (fade-in montée)
  maquetteBoxes.forEach((box, idx) => {
    box.style.opacity = 0;
    box.style.transform = 'translateY(40px)';
    box.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)';
    setTimeout(() => {
      box.style.opacity = 1;
      box.style.transform = 'translateY(0)';
    }, 300 + idx * 120);
  });

  // Bouton
  if (button) {
    setTimeout(() => button.classList.add('visible'), 700);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  animateTitle();
  initScrollAnimations();
});
