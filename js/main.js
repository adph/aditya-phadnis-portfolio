// ── ICONS ──
lucide.createIcons();

// ── CURSOR GLOW ──
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});


// ── CARD PARALLAX TILT (desktop only) ──
const tiltCards = window.matchMedia('(hover: hover)').matches
  ? document.querySelectorAll('.skill-card, .project-card, .edu-card')
  : [];
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px) scale(1.01)`;
    card.style.transition = 'background 0.2s, box-shadow 0.2s';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'background 0.2s, box-shadow 0.2s, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
  });
});

// ── NAV ──
const nav = document.querySelector('nav');
const hero = document.querySelector('#hero');

function updateNav() {
  const heroBottom = hero.getBoundingClientRect().bottom;
  nav.classList.toggle('nav-visible', heroBottom <= 0);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── SCROLL NAV ──
(function() {
  const sections = ['hero','about','skills','projects','experience','education','contact'];
  const navItems = document.querySelectorAll('.scroll-nav-item');

  function getActive() {
    const mid = window.innerHeight * 0.5;
    let active = sections[0];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= mid) active = id;
    }
    return active;
  }

  function updateScrollNav() {
    const active = getActive();
    navItems.forEach(item => {
      const href = item.getAttribute('href').replace('#', '');
      item.classList.toggle('active', href === active);
    });
    document.body.classList.toggle('on-hero', active === 'hero');
  }

  window.addEventListener('scroll', updateScrollNav, { passive: true });
  updateScrollNav();
})();

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger').forEach(el => {
  observer.observe(el);
});
