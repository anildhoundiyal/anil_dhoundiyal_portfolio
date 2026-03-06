/**
 * ANIL DHOUNDIYAL — PORTFOLIO JAVASCRIPT
 * =========================================
 * 1. Custom Cursor
 * 2. Navbar (scroll, active link, mobile menu)
 * 3. Dark / Light Mode Toggle  ← NEW
 * 4. Typing Animation
 * 5. Scroll Reveal
 * 6. Skill Bar Animations
 * 7. Counter Animations
 * 8. Contact Form Validation
 * 9. Footer Year
 * 10. Smooth Scroll
 */

/* ─── 1. CUSTOM CURSOR ──────────────────────────────────── */
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  const LAG = 0.14;
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top  = `${mouseY}px`;
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * LAG;
    ringY += (mouseY - ringY) * LAG;
    ring.style.left = `${ringX}px`;
    ring.style.top  = `${ringY}px`;
    requestAnimationFrame(animateRing);
  })();

  const hoverables = 'a, button, .skill-card, .project-card, .contact-card, .tool-tag, .resume-download-card, input, textarea';
  document.addEventListener('mouseover', e => { if (e.target.closest(hoverables)) ring.classList.add('hovered'); });
  document.addEventListener('mouseout',  e => { if (e.target.closest(hoverables)) ring.classList.remove('hovered'); });
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '0.7'; });
})();


/* ─── 2. NAVBAR ─────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }, { passive: true });

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    links.forEach(link => {
      const id = link.getAttribute('data-section');
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;
      const top = section.offsetTop;
      if (scrollPos >= top && scrollPos < top + section.offsetHeight) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.addEventListener('click', e => {
    if (e.target.matches('.nav-link, .nav-resume-btn')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();


/* ─── 3. DARK / LIGHT MODE TOGGLE ───────────────────────── */
(function initThemeToggle() {
  const html      = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  /* --- Load saved preference or default to dark --- */
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  toggleBtn.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

  /* --- Toggle on click --- */
  toggleBtn.addEventListener('click', () => {
    const current  = html.getAttribute('data-theme');
    const next     = current === 'dark' ? 'light' : 'dark';

    /* Smooth transition: add class to body before changing theme */
    html.style.transition = 'background-color 0.4s ease, color 0.4s ease';

    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
    toggleBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    /* Brief visual feedback on the button */
    toggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => { toggleBtn.style.transform = ''; }, 150);
  });
})();


/* ─── 4. TYPING ANIMATION ────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const roles = [
    'Frontend Developer',
    'React Developer',
    'Web Developer',
    'Next.js Developer',
    'UI Developer'
  ];

  let roleIdx = 0, charIdx = 0, isDeleting = false, isPausing = false;

  function type() {
    if (isPausing) { isPausing = false; setTimeout(type, isDeleting ? 400 : 1800); return; }
    const current = roles[roleIdx];

    if (!isDeleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { isDeleting = true; isPausing = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; isPausing = true; setTimeout(type, 400); return; }
    }
    setTimeout(type, isDeleting ? 50 : 90);
  }
  setTimeout(type, 1200);
})();


/* ─── 5. SCROLL REVEAL ───────────────────────────────────── */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  els.forEach(el => obs.observe(el));
})();


/* ─── 6. SKILL BARS ──────────────────────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        setTimeout(() => { bar.style.width = `${bar.getAttribute('data-width')}%`; }, 300);
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => obs.observe(b));
})();


/* ─── 7. COUNTERS ────────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  const DURATION = 1800;

  function animate(el, target) {
    const start = performance.now();
    function update(now) {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target, parseInt(e.target.getAttribute('data-count'), 10));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();


/* ─── 8. CONTACT FORM ────────────────────────────────────── */
(function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success   = document.getElementById('formSuccess');
  if (!form) return;

  function validate(inputId, errorId, msg) {
    const input   = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    const val     = input.value.trim();

    if (!val) {
      input.classList.add('error');
      errorEl.textContent = msg;
      return false;
    }
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      input.classList.add('error');
      errorEl.textContent = 'Please enter a valid email address.';
      return false;
    }
    input.classList.remove('error');
    errorEl.textContent = '';
    return true;
  }

  /* Live clear on input */
  form.querySelectorAll('input, textarea').forEach(f => {
    f.addEventListener('input', () => {
      f.classList.remove('error');
      const err = document.getElementById(`${f.id.replace('Input','Error')}`);
      if (err) err.textContent = '';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const ok =
      validate('nameInput',    'nameError',    'Please enter your name.') &
      validate('emailInput',   'emailError',   'Please enter your email.') &
      validate('subjectInput', 'subjectError', 'Please enter a subject.') &
      validate('messageInput', 'messageError', 'Please enter a message.');

    if (!ok) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    /* Replace with real EmailJS / Formspree call here */
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      success.classList.add('show');
      success.style.animation = 'bounceIn 0.5s ease';
      form.reset();
      setTimeout(() => { success.classList.remove('show'); success.style.animation = ''; }, 6000);
    }, 1500);
  });
})();


/* ─── 9. FOOTER YEAR ─────────────────────────────────────── */
(function() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ─── 10. SMOOTH SCROLL ──────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
})();


/* ─── HERO ENTRANCE ──────────────────────────────────────── */
(function() {
  document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 120);
  });
  const hr = document.querySelector('.hero .reveal-right');
  if (hr) setTimeout(() => hr.classList.add('visible'), 500);
})();