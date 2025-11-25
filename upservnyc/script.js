document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    initScrollAnimations();
    
    initFloatingLogo();
});


function initFloatingLogo() {
    const floatingLogo = document.getElementById('floatingLogo');
    const heroSection = document.querySelector('.hero');
    
    if (!floatingLogo) return;

    setTimeout(() => {
        floatingLogo.classList.add('visible');
    }, 300);

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        lastScroll = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateLogoVisibility(lastScroll, floatingLogo);
                updateHeroVisibility(lastScroll, heroSection);
                ticking = false;
            });

            ticking = true;
        }
    });
}

function updateLogoVisibility(scrollPos, logo) {
    if (scrollPos > 200) {
        logo.classList.remove('visible');
        logo.classList.add('hidden');
    } else {
        logo.classList.add('visible');
        logo.classList.remove('hidden');
    }
}

function updateHeroVisibility(scrollPos, hero) {
    if (!hero) return;
    
    if (scrollPos > 100) {
        hero.classList.add('scrolling-out');
    } else {
        hero.classList.remove('scrolling-out');
    }
}

function initScrollAnimations() {
    const sections = document.querySelectorAll('.content-section');
    
    if (sections.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});