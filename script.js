// Custom cursor
(function () {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
    dot.classList.add('visible');
  });

  document.addEventListener('mouseleave', () => dot.classList.remove('visible'));
  document.addEventListener('mouseenter', () => dot.classList.add('visible'));

  const HOVER = 'a, button, .card, .nav-logo, .tag, .skill';
  document.addEventListener('mouseover', (e) => { if (e.target.closest(HOVER)) dot.classList.add('hovering'); });
  document.addEventListener('mouseout',  (e) => { if (e.target.closest(HOVER)) dot.classList.remove('hovering'); });

  document.addEventListener('mousedown', () => dot.classList.add('clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('clicking'));
})();

// Lightbox
(function () {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  const img = document.createElement('img');
  const btn = document.createElement('button');
  btn.className = 'lightbox-close';
  btn.textContent = '×';
  lb.append(img, btn);
  document.body.appendChild(lb);

  document.querySelectorAll('.proj-viz img').forEach(el => {
    el.addEventListener('click', () => {
      img.src = el.src;
      img.alt = el.alt;
      lb.classList.add('open');
    });
  });

  function close() { lb.classList.remove('open'); }
  btn.addEventListener('click', close);
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);

document.querySelectorAll('.card, .exp-education, .exp-entry, .about-grid, .contact-title, .contact-sub').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Stagger card reveals
document.querySelectorAll('.card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = '#f0f0f5';
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => navObserver.observe(s));
