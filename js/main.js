/**
 * LOKVIDYA - Main Application
 * Orchestrates all modules and handles global functionality
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

/**
 * Initialize the application
 */
function initApp() {
    // Initialize components
    initHeader();
    initSmoothScroll();
    initAnimations();
    initStatCounters();
    initArchiveFilters();
    initMap();
    initMobileMenu();
    initCharts();

    console.log('🪷 Lokvidya initialized');
}

/**
 * Initialize header scroll effects
 */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        header.classList.toggle('scrolled', currentScroll > 50);

        lastScroll = currentScroll;
    }, { passive: true });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) return;

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll, { passive: true });
}

/**
 * Initialize animated stat counters
 */
function initStatCounters() {
    const stats = getStats();
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(updateCounter);
    };

    // Intersection observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const counterType = element.dataset.counter;

                let value = 0;
                switch (counterType) {
                    case 'entries':
                        value = stats.totalEntries;
                        break;
                    case 'languages':
                        value = stats.totalLanguages;
                        break;
                    case 'categories':
                        value = stats.totalCategories;
                        break;
                    case 'contributors':
                        value = stats.contributors;
                        break;
                    default:
                        value = parseInt(element.textContent) || 0;
                }

                animateCounter(element, value);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Initialize archive filter system
 */
function initArchiveFilters() {
    // The archiveFilter is defined in filter.js
    if (typeof archiveFilter !== 'undefined') {
        archiveFilter.init();
        archiveFilter.loadFromURL();
    }
}

/**
 * Initialize India map interactions
 */
function initMap() {
    const mapContainer = document.querySelector('.india-map');
    if (!mapContainer) return;

    const indiaMap = new IndiaMap(mapContainer);
    indiaMap.init();

    // Connect map clicks to archive filter
    indiaMap.onStateClick = (stateName, languages) => {
        if (!stateName) {
            archiveFilter.resetFilters();
            return;
        }
        // Filter by all languages in the state
        archiveFilter.filterByLanguages(languages);
    };
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.menu-toggle');

    if (mobileNav) mobileNav.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
}

/**
 * Initialize simple charts (using CSS only, no external libraries)
 */
function initCharts() {
    const stats = getStats();
    if (!stats) return;

    // Observer for bar animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;

                // 1. First, update the data attributes and values (stays at 0% width)
                updateChartData(stats);

                // 2. Then, trigger the animation with a small delay
                setTimeout(() => {
                    const bars = chart.querySelectorAll('.bar-fill');
                    bars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width') || '0';
                        // Force reflow
                        void bar.offsetWidth;
                        bar.style.width = targetWidth + '%';
                    });
                }, 50);

                chartObserver.unobserve(chart);
            }
        });
    }, observerOptions);

    const charts = document.querySelectorAll('.bar-chart');
    charts.forEach(chart => chartObserver.observe(chart));
}

/**
 * Update chart values and data-width attributes from real stats
 */
function updateChartData(stats) {
    // Category Chart
    const catChart = document.getElementById('categoryChart');
    if (catChart) {
        const catCounts = stats.entriesByCategory;
        const maxValue = Math.max(...Object.values(catCounts), 1);
        const rows = catChart.querySelectorAll('.chart-bar');

        rows.forEach(row => {
            const labelText = row.querySelector('.bar-label').textContent.trim().toLowerCase();

            // Map labels to CATEGORIES IDs
            let categoryId = 'other';
            if (labelText.includes('folksong')) categoryId = 'folksongs';
            if (labelText.includes('agri')) categoryId = 'agriculture';
            if (labelText.includes('cultur')) categoryId = 'culture';
            if (labelText.includes('forest')) categoryId = 'forest';
            if (labelText.includes('food')) categoryId = 'food';

            const count = catCounts[categoryId] || 0;
            const percentage = Math.round((count / maxValue) * 100);

            // Set for animation and display
            row.querySelector('.bar-fill').setAttribute('data-width', percentage);
            row.querySelector('.bar-value').textContent = count;
        });
    }

    // Type Chart
    const typeChart = document.getElementById('typeChart');
    if (typeChart) {
        const typeCounts = stats.entriesByType;
        const maxValue = Math.max(...Object.values(typeCounts), 1);
        const rows = typeChart.querySelectorAll('.chart-bar');

        rows.forEach(row => {
            const labelText = row.querySelector('.bar-label').textContent.trim().toLowerCase();
            let typeId = 'text';
            if (labelText.includes('image')) typeId = 'images';
            if (labelText.includes('audio')) typeId = 'audio';

            const count = typeCounts[typeId] || 0;
            const percentage = Math.round((count / maxValue) * 100);

            row.querySelector('.bar-fill').setAttribute('data-width', percentage);
            row.querySelector('.bar-value').textContent = count;
        });
    }
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
