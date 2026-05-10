/* ══════════════════════════════════════════
   ETHEREAL LABEL — JAVASCRIPT
   main.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom cursor (desktop only) ── */
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;

  if (isDesktop) {
    const cur  = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');

    if (cur && ring) {
      cur.style.display  = 'block';
      ring.style.display = 'block';

      let mx = 0, my = 0, rx = 0, ry = 0;

      document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + 'px';
        cur.style.top  = my + 'px';
      });

      (function loop() {
        rx += (mx - rx) * 0.13;
        ry += (my - ry) * 0.13;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(loop);
      })();

      document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cur.style.width   = '12px';
          cur.style.height  = '12px';
          ring.style.width  = '48px';
          ring.style.height = '48px';
          ring.style.borderColor = 'rgba(0,255,136,0.7)';
        });
        el.addEventListener('mouseleave', () => {
          cur.style.width   = '8px';
          cur.style.height  = '8px';
          ring.style.width  = '32px';
          ring.style.height = '32px';
          ring.style.borderColor = 'rgba(0,255,136,0.4)';
        });
      });
    }
  }

  /* ── Nav scroll effect ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Hamburger / mobile menu ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.06 });
    reveals.forEach(el => obs.observe(el));
  }

  /* ── FormSubmit: set _next to current page + ?sent=1 ── */
  const form = document.getElementById('demoForm');
  if (form) {
    const nextField = form.querySelector('input[name="_next"]');
    if (nextField) {
      nextField.value = window.location.href.split('?')[0] + '?sent=1';
    }
  }

  /* ── Show success message if redirected back with ?sent=1 ── */
  if (window.location.search.includes('sent=1')) {
    const demoForm    = document.getElementById('demoForm');
    const formSuccess = document.getElementById('formSuccess');

    if (demoForm)    demoForm.style.display = 'none';
    if (formSuccess) formSuccess.classList.add('show');

    setTimeout(() => {
      const submitSection = document.getElementById('submit');
      if (submitSection) submitSection.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

});
