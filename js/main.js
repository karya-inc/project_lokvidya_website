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
async function initApp() {
    console.log('🚀 Lokvidya initialization started');

    // 1. Data load is critical
    try {
        await loadArchiveData();
    } catch (err) {
        console.error('❌ Data load failed:', err);
    }

    // 2. Initialize visual components immediately
    try { initHeader(); } catch (e) { console.error('Header init failed', e); }
    try { initAnimations(); } catch (e) { console.error('Animations init failed', e); }

    // 3. Stats and Charts (High priority for user)
    try { initStatCounters(); } catch (e) { console.error('Counters init failed', e); }
    try { initCharts(); } catch (e) { console.error('Charts init failed', e); }

    // 4. Other interactive components
    try { initSmoothScroll(); } catch (e) { console.error('SmoothScroll init failed', e); }
    try { initArchiveFilters(); } catch (e) { console.error('Filters init failed', e); }
    try { initMap(); } catch (e) { console.error('Map init failed', e); }
    try { initMobileMenu(); } catch (e) { console.error('MobileMenu init failed', e); }

    console.log('🪷 Lokvidya initialization complete');
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
                el.classList.add('revealed');
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
/**
 * Initialize animated stat counters
 */
function initStatCounters() {
    const stats = typeof getStats === 'function' ? getStats() : null;
    if (!stats) {
        console.warn('⚠️ getStats not available for counters');
        return;
    }

    const counters = document.querySelectorAll('[data-counter]');

    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const counterType = element.dataset.counter;
                let value = parseInt(element.textContent) || 0;

                if (counterType === 'entries') value = stats.totalEntries;
                else if (counterType === 'languages') value = stats.totalLanguages;
                else if (counterType === 'contributors') value = stats.contributors;
                else if (counterType === 'states') value = stats.states;

                animateCounter(element, value);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Initialize charts with robustness
 */
function initCharts() {
    const stats = typeof getStats === 'function' ? getStats() : null;
    if (!stats) {
        console.warn('⚠️ getStats not available for charts');
        return;
    }

    const charts = document.querySelectorAll('.bar-chart');
    if (charts.length === 0) return;

    // First, populate all values immediately (0 width initially)
    charts.forEach(chart => updateChartStatic(chart, stats));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                animateChart(chart, stats);
                chartObserver.unobserve(chart);
            }
        });
    }, observerOptions);

    charts.forEach(chart => chartObserver.observe(chart));

    // Support for elements already in view
    setTimeout(() => {
        charts.forEach(chart => {
            const rect = chart.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animateChart(chart, stats);
            }
        });
    }, 800);
}

/**
 * Update numbers immediately without animation
 */
function updateChartStatic(chart, stats) {
    if (chart.id === 'categoryChart') {
        const catCounts = stats.entriesByCategory;
        const rows = chart.querySelectorAll('.chart-bar');
        rows.forEach(row => {
            const labelEl = row.querySelector('.bar-label');
            const valEl = row.querySelector('.bar-value');
            if (!labelEl || !valEl) return;

            const label = labelEl.textContent.trim().toLowerCase();
            let categoryId = 'other';
            if (label.includes('folksong')) categoryId = 'folksongs';
            else if (label.includes('agri')) categoryId = 'agriculture';
            else if (label.includes('cultur')) categoryId = 'culture';
            else if (label.includes('forest')) categoryId = 'forest';
            else if (label.includes('food')) categoryId = 'food';

            const count = catCounts[categoryId] || 0;
            valEl.textContent = count;
        });
    } else if (chart.id === 'typeChart') {
        const typeCounts = stats.entriesByType;
        const rows = chart.querySelectorAll('.chart-bar');
        rows.forEach(row => {
            const labelEl = row.querySelector('.bar-label');
            const valEl = row.querySelector('.bar-value');
            if (!labelEl || !valEl) return;

            const label = labelEl.textContent.trim().toLowerCase();
            let typeId = 'images';
            if (label.includes('audio')) typeId = 'audio';

            const count = typeCounts[typeId] || 0;
            valEl.textContent = count;
        });
    }
}

/**
 * Animate widths
 */
function animateChart(chart, stats) {
    if (chart.classList.contains('animated')) return;

    const isCategory = chart.id === 'categoryChart';
    const counts = isCategory ? stats.entriesByCategory : stats.entriesByType;
    const maxValue = Math.max(...Object.values(counts), 1);
    const rows = chart.querySelectorAll('.chart-bar');

    rows.forEach(row => {
        const labelEl = row.querySelector('.bar-label');
        const fillEl = row.querySelector('.bar-fill');
        if (!labelEl || !fillEl) return;

        const label = labelEl.textContent.trim().toLowerCase();
        let id = 'other';

        if (isCategory) {
            if (label.includes('folksong')) id = 'folksongs';
            else if (label.includes('agri')) id = 'agriculture';
            else if (label.includes('cultur')) id = 'culture';
            else if (label.includes('forest')) id = 'forest';
            else if (label.includes('food')) id = 'food';
        } else {
            id = 'images';
            if (label.includes('audio')) id = 'audio';
        }

        const count = counts[id] || 0;
        const percentage = Math.round((count / maxValue) * 100);

        // Force reflow and apply width
        requestAnimationFrame(() => {
            fillEl.style.width = Math.max(percentage, 2) + '%';
        });
    });

    chart.classList.add('animated');
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

    if (typeof IndiaMap !== 'undefined') {
        const indiaMap = new IndiaMap(mapContainer);
        indiaMap.init();

        // Connect map clicks to archive filter
        indiaMap.onStateClick = (stateName, languages) => {
            if (!stateName) {
                if (typeof archiveFilter !== 'undefined') archiveFilter.resetFilters();
                return;
            }
            // Filter by all languages in the state
            if (typeof archiveFilter !== 'undefined') archiveFilter.filterByLanguages(languages);
        };
    }
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');

    if (nav) nav.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
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
