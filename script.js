// ========================================
// SMOOTH SCROLLING Y NAVEGACIÓN
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Cerrar menú móvil si está abierto
            const nav = document.querySelector('.nav');
            const menuToggle = document.getElementById('menuToggle');
            
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Scroll suave al elemento
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Actualizar link activo
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 255, 65, 0.5)';
    }
    
    // Ocultar/mostrar header al hacer scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ========================================
// TYPING EFFECT
// ========================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = 'Software Developer';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// ========================================
// SKILL BARS ANIMATION
// ========================================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('.section-scroll');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll('.skill-card, .portfolio-card, .timeline-item, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// CONSOLE MESSAGE - HACKER STYLE
// ========================================
console.log('%c> SYSTEM INITIALIZED', 'color: #00ff41; font-size: 16px; font-family: monospace; font-weight: bold;');
console.log('%c> LOADING PORTFOLIO...', 'color: #00cc33; font-size: 14px; font-family: monospace;');
console.log('%c> ACCESS GRANTED', 'color: #00ff88; font-size: 14px; font-family: monospace;');
console.log('%c> █', 'color: #00ff41; font-size: 16px; font-family: monospace;');

// ========================================
// SKILLS CAROUSEL
// ========================================
class SkillsCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        
        if (!this.track || !this.prevBtn || !this.nextBtn) {
            return; // Carousel elements not found
        }
        
        this.items = Array.from(this.track.querySelectorAll('.carousel-item'));
        this.currentIndex = 0;
        this.itemCount = this.items.length;
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        // Mark first item as active
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === 0);
        });
        
        // Create indicators
        this.createIndicators();
        this.updateTrack();
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < this.itemCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.track.closest('section#skills')) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            }
        });
    }
    
    updateTrack() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update active indicator
        const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update active item
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateTrack();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateTrack();
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.itemCount - 1));
        this.updateTrack();
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SkillsCarousel();
    new PortfolioCarousel();
});

// ========================================
// PORTFOLIO CAROUSEL
// ========================================
class PortfolioCarousel {
    constructor() {
        this.track = document.getElementById('portfolioCarouselTrack');
        this.prevBtn = document.getElementById('portfolioCarouselPrev');
        this.nextBtn = document.getElementById('portfolioCarouselNext');
        this.indicatorsContainer = document.getElementById('portfolioCarouselIndicators');
        
        if (!this.track || !this.prevBtn || !this.nextBtn) {
            return; // Carousel elements not found
        }
        
        this.items = Array.from(this.track.querySelectorAll('.carousel-item'));
        this.currentIndex = 0;
        this.itemCount = this.items.length;
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        // Mark first item as active
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === 0);
        });
        
        // Create indicators
        this.createIndicators();
        this.updateTrack();
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < this.itemCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation when portfolio section is in view
        document.addEventListener('keydown', (e) => {
            const portfolioSection = document.querySelector('section#portfolio');
            if (portfolioSection) {
                const rect = portfolioSection.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.prevSlide();
                    }
                    if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.nextSlide();
                    }
                }
            }
        });
    }
    
    updateTrack() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update active indicator
        const indicators = this.indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update active item
        this.items.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateTrack();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateTrack();
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.itemCount - 1));
        this.updateTrack();
    }
}
