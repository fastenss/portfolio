/**
 * Portfolio Website - Main JavaScript
 * Handles navigation toggle, smooth scroll, form submission, and animations
 */

// ========================================
// DOM Elements
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');

// ========================================
// Mobile Navigation Toggle
// ========================================
function initMobileNav() {
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbarScroll() {
    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            nav.style.boxShadow = 'var(--shadow-md)';
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.boxShadow = 'none';
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
        }

        // Dark mode support
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            if (currentScroll > scrollThreshold) {
                nav.style.background = 'rgba(15, 15, 26, 0.95)';
            } else {
                nav.style.background = 'rgba(15, 15, 26, 0.8)';
            }
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Intersection Observer for Animations
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .about-text > *, .contact-form > *'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize elements for animation
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// ========================================
// Contact Form Handling
// ========================================
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!validateForm(data)) return;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Replace with your form submission endpoint
            // For now, we'll simulate a successful submission
            await simulateFormSubmission(data);

            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function validateForm(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters');
    }

    if (errors.length > 0) {
        showToast(errors.join('\n'), 'error');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function simulateFormSubmission(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would integrate with your backend:
    // - Formspree: fetch('https://formspree.io/f/your-form-id', { method: 'POST', body: JSON.stringify(data) })
    // - Netlify Forms: fetch('/', { method: 'POST', body: new FormData(contactForm) })
    // - Custom backend: fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

    console.log('Form submitted:', data);
    return { success: true };
}

// ========================================
// Toast Notifications
// ========================================
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        color: 'white',
        fontWeight: '500',
        fontSize: '0.875rem',
        zIndex: '3000',
        maxWidth: '350px',
        boxShadow: 'var(--shadow-xl)',
        transform: 'translateX(120%)',
        transition: 'transform 0.3s ease',
        background: type === 'success'
            ? 'linear-gradient(135deg, #10b981, #059669)'
            : type === 'error'
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #3b82f6, #2563eb)'
    });

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ========================================
// Active Nav Link on Scroll
// ========================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksList.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// ========================================
// Initialize All
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initNavbarScroll();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initActiveNavLink();

    // Add active class style for nav links
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--color-primary) !important;
        }
        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
});

// ========================================
// Performance: Lazy Load Images
// ========================================
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imgObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imgObserver.observe(img));
}

// Initialize lazy loading if images exist
if (document.querySelector('img[data-src]')) {
    document.addEventListener('DOMContentLoaded', initLazyLoad);
}