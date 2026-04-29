/* ============================================================
   HM BIOVITAL – main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Sticky Header
     ---------------------------------------------------------- */
  const header = document.querySelector('.header');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ----------------------------------------------------------
     Mobile Navigation
     ---------------------------------------------------------- */
  const hamburger     = document.querySelector('.hamburger');
  const mobileNav     = document.querySelector('.mobile-nav');
  const mobileClose   = document.querySelector('.mobile-nav-close');

  const openMenu = () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  // Close on nav link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ----------------------------------------------------------
     Scroll Reveal
     ---------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -48px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }


  /* ----------------------------------------------------------
     Active Nav Link
     ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.style.color = 'var(--gold)';
    }
  });


  /* ----------------------------------------------------------
     Contact Form – AJAX submit with nForms
     shield.js injects honeypot/timing fields,
     we intercept and send via fetch for no-redirect UX
     ---------------------------------------------------------- */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Wird gesendet …';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          contactForm.innerHTML = `
            <div style="text-align: center; padding: 48px 24px;">
              <h3 style="color: var(--gold); margin-bottom: 12px;">Vielen Dank!</h3>
              <p style="color: var(--text-light); font-size: 1.05rem; line-height: 1.7;">
                Ihre Anfrage ist bei uns eingegangen.<br>
                Wir melden uns schnellstmöglich bei Ihnen.
              </p>
            </div>`;
        } else {
          throw new Error();
        }
      } catch {
        submitBtn.textContent = 'Fehler – bitte erneut versuchen';
        submitBtn.style.background = '#c0392b';
        submitBtn.style.color = '#fff';
        submitBtn.disabled = false;

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 4000);
      }
    }, true);
  }


  /* ----------------------------------------------------------
     Smooth scroll for anchor links
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 20 : 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: 'smooth'
        });
      }
    });
  });

});
