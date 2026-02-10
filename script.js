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
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = requestAnimationFrame(() => {
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
    });
    
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
// CONSOLE MESSAGE - HACKER STYLE (Development Only)
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c> SYSTEM INITIALIZED', 'color: #00ff41; font-size: 16px; font-family: monospace; font-weight: bold;');
    console.log('%c> LOADING PORTFOLIO...', 'color: #00cc33; font-size: 14px; font-family: monospace;');
    console.log('%c> ACCESS GRANTED', 'color: #00ff88; font-size: 14px; font-family: monospace;');
    console.log('%c> █', 'color: #00ff41; font-size: 16px; font-family: monospace;');
}

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
        this.heightUpdateTimeout = null;
        
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
        
        // Ensure height is set after initial render
        setTimeout(() => {
            this.updateCarouselHeight();
        }, 100);
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
        
        // Keyboard navigation will be handled by global handler
        this.handleKeyboard = (e) => {
            const skillsSection = document.querySelector('section#skills');
            if (skillsSection) {
                const rect = skillsSection.getBoundingClientRect();
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
        };
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
        
        // Cancel any pending height update
        if (this.heightUpdateTimeout) {
            clearTimeout(this.heightUpdateTimeout);
        }
        
        // Update carousel height dynamically based on active item
        // Use setTimeout to ensure DOM has updated after class changes
        this.heightUpdateTimeout = setTimeout(() => {
            this.updateCarouselHeight();
            this.heightUpdateTimeout = null;
        }, 50);
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
    
    updateCarouselHeight() {
        // Wait for next frame to ensure layout is calculated
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const activeItem = this.items[this.currentIndex];
                if (!activeItem) {
                    console.warn('No active item found');
                    return;
                }
                
                const container = activeItem.querySelector('.skill-category-container');
                if (!container) {
                    console.warn('No skill-category-container found in active item');
                    return;
                }
                
                // Temporarily make all items visible to get accurate measurements
                const originalDisplay = activeItem.style.display;
                activeItem.style.display = 'flex';
                
                // Force a reflow to get accurate height
                void container.offsetHeight;
                
                // Get the actual height including all content
                const containerHeight = container.getBoundingClientRect().height;
                const itemHeight = activeItem.getBoundingClientRect().height;
                
                // Restore original display
                if (originalDisplay) {
                    activeItem.style.display = originalDisplay;
                }
                
                const carousel = this.track.closest('.skills-carousel');
                
                if (carousel && itemHeight > 0) {
                    const previousHeight = carousel.style.minHeight || 'auto';
                    
                    // Set height to accommodate the content smoothly
                    carousel.style.minHeight = `${itemHeight}px`;
                    carousel.style.transition = 'min-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    
                    // Debug log (only in development)
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log(`%c> Carousel height: ${previousHeight} → ${itemHeight}px (container: ${containerHeight}px, index: ${this.currentIndex})`, 'color: #00ff88; font-family: monospace;');
                    }
                } else {
                    console.warn('Carousel not found or invalid height:', { carousel, itemHeight });
                }
            });
        });
    }
}

// Carousels will be initialized in the main DOMContentLoaded

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
        
        // Keyboard navigation will be handled by global handler
        this.handleKeyboard = (e) => {
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
        };
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

// ========================================
// PROFILE CARD 3D TILT & GLOW EFFECTS
// ========================================
class ProfileCardEffects {
    constructor() {
        this.card = document.getElementById('profileCard');
        this.glow = document.getElementById('profileGlow');
        this.shine = document.getElementById('profileShine');
        
        if (!this.card) return;
        
        this.boundingRect = null;
        this.isHovered = false;
        
        this.init();
    }
    
    init() {
        this.card.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.boundingRect = this.card.getBoundingClientRect();
        });
        
        this.card.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.resetCard();
        });
        
        this.card.addEventListener('mousemove', (e) => {
            if (!this.isHovered) return;
            this.handleMouseMove(e);
        });
    }
    
    handleMouseMove(e) {
        const rect = this.boundingRect;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        const tiltX = ((yPercent - 50) / 50) * -10;
        const tiltY = ((xPercent - 50) / 50) * 10;
        
        this.card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        if (this.glow) {
            this.glow.style.left = `${xPercent}%`;
            this.glow.style.top = `${yPercent}%`;
        }
        
        if (this.shine) {
            this.shine.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`;
        }
    }
    
    resetCard() {
        this.card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (this.glow) {
            this.glow.style.left = '50%';
            this.glow.style.top = '50%';
        }
    }
}

// ========================================
// GLOBAL INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousels
    const skillsCarousel = new SkillsCarousel();
    const portfolioCarousel = new PortfolioCarousel();
    
    // Initialize profile card effects
    new ProfileCardEffects();
    
    // Add touch gestures to carousels
    if (skillsCarousel.track) {
        new TouchGestureHandler(skillsCarousel);
    }
    if (portfolioCarousel.track) {
        new TouchGestureHandler(portfolioCarousel);
    }
    
    // Global keyboard handler for carousels (more efficient than multiple listeners)
    document.addEventListener('keydown', (e) => {
        if (skillsCarousel.handleKeyboard) skillsCarousel.handleKeyboard(e);
        if (portfolioCarousel.handleKeyboard) portfolioCarousel.handleKeyboard(e);
    });
    
    // Update carousel heights on breakpoint change
    window.addEventListener('breakpointChange', () => {
        if (skillsCarousel.updateCarouselHeight) {
            setTimeout(() => skillsCarousel.updateCarouselHeight(), 100);
        }
    });
    
    // Update carousel heights on window resize with debounce
    let resizeHeightTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeHeightTimeout);
        resizeHeightTimeout = setTimeout(() => {
            if (skillsCarousel.updateCarouselHeight) {
                skillsCarousel.updateCarouselHeight();
            }
        }, 300);
    });
});

// ========================================
// RESPONSIVE UTILITIES
// ========================================
class ResponsiveHandler {
    constructor() {
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            wide: 1440
        };
        
        this.currentBreakpoint = this.getBreakpoint();
        this.init();
    }
    
    init() {
        // Handle window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Initial setup
        this.handleResize();
    }
    
    getBreakpoint() {
        const width = window.innerWidth;
        
        if (width < this.breakpoints.mobile) return 'xs';
        if (width < this.breakpoints.tablet) return 'mobile';
        if (width < this.breakpoints.desktop) return 'tablet';
        if (width < this.breakpoints.wide) return 'desktop';
        return 'wide';
    }
    
    handleResize() {
        const newBreakpoint = this.getBreakpoint();
        
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.onBreakpointChange(newBreakpoint);
        }
        
        // Update viewport height for mobile browsers
        this.updateViewportHeight();
        
        // Recalculate carousel positions if needed
        this.recalculateLayout();
    }
    
    updateViewportHeight() {
        // Fix for mobile browsers where 100vh includes address bar
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    handleOrientationChange() {
        // Close mobile menu on orientation change
        const nav = document.querySelector('.nav');
        const menuToggle = document.getElementById('menuToggle');
        
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
        
        // Update layout
        this.updateViewportHeight();
        this.recalculateLayout();
    }
    
    recalculateLayout() {
        // Trigger reflow for carousels
        const carouselTracks = document.querySelectorAll('.carousel-track');
        carouselTracks.forEach(track => {
            const currentTransform = track.style.transform;
            track.style.transform = 'none';
            // Force reflow
            void track.offsetHeight;
            track.style.transform = currentTransform;
        });
    }
    
    onBreakpointChange(breakpoint) {
        // Log breakpoint change (only in development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log(`%c> BREAKPOINT CHANGED: ${breakpoint}`, 'color: #00ff41; font-family: monospace;');
        }
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('breakpointChange', { 
            detail: { breakpoint } 
        }));
    }
}

// ========================================
// TOUCH GESTURES FOR CAROUSELS
// ========================================
class TouchGestureHandler {
    constructor(carousel) {
        this.carousel = carousel;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;
        
        if (carousel.track) {
            this.init();
        }
    }
    
    init() {
        this.carousel.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }
    
    handleSwipe() {
        const swipeDistance = this.touchStartX - this.touchEndX;
        
        if (Math.abs(swipeDistance) > this.minSwipeDistance) {
            if (swipeDistance > 0) {
                // Swipe left - next slide
                this.carousel.nextSlide();
            } else {
                // Swipe right - previous slide
                this.carousel.prevSlide();
            }
        }
    }
}

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================
class LazyImageLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Only log in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            window.addEventListener('load', () => {
                if (window.performance && window.performance.timing) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                    
                    console.log(`%c> PAGE LOAD TIME: ${pageLoadTime}ms`, 'color: #00ff88; font-family: monospace;');
                    console.log(`%c> DOM READY TIME: ${domReadyTime}ms`, 'color: #00ff88; font-family: monospace;');
                }
            });
        }
    }
}

// ========================================
// INITIALIZE ALL RESPONSIVE FEATURES
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize responsive handler
    const responsiveHandler = new ResponsiveHandler();
    
    // Initialize lazy loading
    const lazyLoader = new LazyImageLoader();
    
    // Initialize performance monitor
    const perfMonitor = new PerformanceMonitor();
});

// ========================================
// ACCESSIBLE FOCUS MANAGEMENT
// ========================================
class FocusManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Add visible focus indicator for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Trap focus in mobile menu when open
        const nav = document.querySelector('.nav');
        const menuToggle = document.getElementById('menuToggle');
        
        if (nav && menuToggle) {
            menuToggle.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    this.trapFocus(nav);
                } else {
                    this.releaseFocus();
                }
            });
        }
    }
    
    trapFocus(element) {
        const focusableElements = element.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
        
        // Focus first element
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
    
    releaseFocus() {
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.focus();
        }
    }
}

// Initialize focus manager
document.addEventListener('DOMContentLoaded', () => {
    new FocusManager();
});
