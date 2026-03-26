// ── Mobile menu toggle ──────────────────────
function toggleMenu() {
  const links = document.querySelector('.navbar__links');
  if (links) {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '72px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'white';
    links.style.padding = '16px 24px';
    links.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
    links.style.zIndex = '99';
    links.style.gap = '4px';
  }
}

// ── Auto-dismiss flash messages ──────────────
document.addEventListener('DOMContentLoaded', () => {
  const flash = document.querySelector('.flash');
  if (flash) {
    setTimeout(() => {
      flash.style.transition = 'opacity 0.5s';
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 500);
    }, 4000);
  }

  // ── Animate product cards on scroll ──────
  const cards = document.querySelectorAll('.product-card, .cat-card, .trust-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });

  // ── Hero card float animation ──────────────
  const heroCards = document.querySelectorAll('.hero__card');
  heroCards.forEach((card, i) => {
    card.style.animation = `float ${2.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`;
  });

  // ── Add keyframes dynamically ──────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      from { transform: translateY(0) rotate(var(--rot, -6deg)); }
      to   { transform: translateY(-12px) rotate(var(--rot, -6deg)); }
    }
    .hero__card--1 { --rot: -6deg; }
    .hero__card--2 { --rot: 5deg; }
    .hero__card--3 { --rot: 3deg; }
  `;
  document.head.appendChild(style);
});

// ── Smooth quantity update on change ──────────
document.querySelectorAll('.qty-form input[name="quantity"]').forEach(input => {
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => input.closest('form').submit(), 600);
  });
});

// ── Image lazy load fallback ───────────────────
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
  img.addEventListener('error', () => {
    img.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
  });
});
