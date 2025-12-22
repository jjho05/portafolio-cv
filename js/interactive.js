// Advanced Interactive Features (CORREGIDO)

// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
});

// ===== Animated Particles in Hero =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particlesContainer.appendChild(particle);
    }
}
createParticles();

// ===== 3D Card Tilt Effect =====
const cards3D = document.querySelectorAll('.card-3d');
cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
    });
});

// ===== Magnetic Button Effect =====
const magneticButtons = document.querySelectorAll('.btn-magnetic');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ===== Enhanced Scroll Reveal with Stagger =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const staggerItems = entry.target.querySelectorAll('.stagger-item');
            staggerItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 100}ms`;
                item.classList.add('active');
            });
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ===== ✅ PARALLAX CORREGIDO PARA EL HERO =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            // Apuntamos SOLO al nuevo contenedor del fondo
            const heroBackground = document.querySelector('.hero-background');

            if (heroBackground && scrolled < window.innerHeight) {
                // Aplicamos el transform SOLO al fondo
                heroBackground.style.transform = `translateY(${scrolled * 0.4}px)`;
            }

            ticking = false;
        });
        ticking = true;
    }
});


// ===== Animated Counter for Stats =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-card h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', ''));
                animateValue(counter, 0, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}


// ===== Enhanced Card Hover with Glow =====
const allCards = document.querySelectorAll('.card');
allCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});


// ===== Intersection Observer for Project Icons =====
const iconObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const icon = entry.target.querySelector('i');
            if (icon) {
                icon.style.animation = 'bounce 1s ease';
            }
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.7 });
document.querySelectorAll('.project-icon, .game-icon').forEach(iconContainer => {
    iconObserver.observe(iconContainer);
});


// ===== Scroll to Top Button =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('%c✅ Todas las funcionalidades interactivas cargadas!', 'font-size: 14px; color: #68d391; font-weight: bold;');