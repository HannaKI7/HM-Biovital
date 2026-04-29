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
     Contact Form – handled by nForms shield.js
     (shield.js intercepts submit, runs PoW, sends to API)
     ---------------------------------------------------------- */


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
