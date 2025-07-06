// Main application entry point
import { LanguageManager } from './language.js';
import { SheetsAPI } from './sheets.js';

class HarleyApp {
    constructor() {
        this.languageManager = new LanguageManager();
        this.sheetsAPI = new SheetsAPI();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeLanguage();
        this.setupNavigation();
        this.setupAnimations();
    }

    setupEventListeners() {
        // Language toggle
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.languageManager.toggleLanguage();
            });
        }

        // Mobile navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }

        // Services modal handlers
        this.setupServiceModals();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Form validation helpers
        this.setupFormValidation();
    }

    setupServiceModals() {
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceModal = document.getElementById('service-modal');
        const menuModal = document.getElementById('menu-modal');
        const modalBtns = document.querySelectorAll('.service-btn');
        const closeBtns = document.querySelectorAll('.close');

        if (serviceCards.length > 0) {
            serviceCards.forEach(card => {
                const learnMoreBtn = card.querySelector('[data-key="learn-more"]');
                const viewMenuBtn = card.querySelector('[data-key="view-menu"]');

                if (learnMoreBtn) {
                    learnMoreBtn.addEventListener('click', () => {
                        this.showServiceDetails(card, serviceModal);
                    });
                }

                if (viewMenuBtn) {
                    viewMenuBtn.addEventListener('click', () => {
                        if (menuModal) {
                            menuModal.style.display = 'block';
                        }
                    });
                }
            });
        }

        closeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    showServiceDetails(card, modal) {
        const service = card.getAttribute('data-service');
        const modalBody = modal.querySelector('#modal-body');
        
        const serviceDetails = {
            gaming: {
                title: 'Private Gaming Rooms',
                description: 'Experience gaming like never before in our premium private rooms.',
                features: ['High-End Gaming PCs', 'Latest Games Library', 'Comfortable Gaming Chairs', 'Private Environment', 'High-Speed Internet'],
                pricing: '50 EGP/hour',
                capacity: '1-4 players per room'
            },
            vr: {
                title: 'VR Racing Simulation',
                description: 'Immerse yourself in high-speed racing with our state-of-the-art VR simulators.',
                features: ['Latest VR Headsets', 'Professional Racing Wheels', 'Multiple Racing Games', 'Multiplayer Support', 'Realistic Physics'],
                pricing: '75 EGP/hour',
                capacity: '1-2 players per session'
            },
            billiard: {
                title: 'Billiardo',
                description: 'Professional billiard tables for competitive play and casual enjoyment.',
                features: ['Professional Pool Tables', 'Quality Cue Sticks', 'Perfect Lighting', 'Comfortable Seating Area', 'Tournament Setup'],
                pricing: '40 EGP/hour',
                capacity: '2-4 players per table'
            }
        };

        const details = serviceDetails[service];
        if (details) {
            modalBody.innerHTML = `
                <div class="service-detail">
                    <h2>${details.title}</h2>
                    <p>${details.description}</p>
                    
                    <div class="detail-section">
                        <h3>Features</h3>
                        <ul>
                            ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Pricing</h3>
                        <p class="price-highlight">${details.pricing}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h3>Capacity</h3>
                        <p>${details.capacity}</p>
                    </div>
                    
                    <div class="detail-actions">
                        <a href="book.html" class="cta-btn primary">Book Now</a>
                        <a href="availability.html" class="cta-btn secondary">Check Availability</a>
                    </div>
                </div>
            `;
            modal.style.display = 'block';
        }
    }

    initializeLanguage() {
        this.languageManager.init();
    }

    setupNavigation() {
        // Set active navigation item based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }

    setupAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .service-card, .room-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Animate hero subtitle text
        this.animateHeroSubtitle();
    }

    animateHeroSubtitle() {
        const animatedTexts = document.querySelectorAll('.animated-text');
        if (animatedTexts.length > 0) {
            let currentIndex = 0;
            
            const animateText = () => {
                animatedTexts.forEach((text, index) => {
                    if (index === currentIndex) {
                        text.style.color = 'var(--primary-color)';
                        text.style.transform = 'scale(1.1)';
                    } else {
                        text.style.color = 'var(--text-color)';
                        text.style.transform = 'scale(1)';
                    }
                });
                
                currentIndex = (currentIndex + 1) % animatedTexts.length;
            };

            // Initial animation
            animateText();
            
            // Continue animation every 2 seconds
            setInterval(animateText, 2000);
        }
    }

    setupFormValidation() {
        // Real-time form validation
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });

            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        this.clearFieldError(field);

        if (isRequired && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }

        if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
            this.showFieldError(field, 'Please enter a valid phone number');
            return false;
        }

        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Utility methods
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? 'var(--success-color)' : 'var(--error-color)'};
            color: var(--background-color);
            border-radius: 10px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    formatCurrency(amount) {
        return `${amount} EGP`;
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    formatTime(time) {
        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.harleyApp = new HarleyApp();
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .field-error {
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    input.error, select.error, textarea.error {
        border-color: var(--error-color) !important;
        box-shadow: 0 0 10px rgba(255, 68, 68, 0.3) !important;
    }
    
    .service-detail {
        padding: 1rem;
    }
    
    .service-detail h2 {
        color: var(--primary-color);
        margin-bottom: 1rem;
    }
    
    .detail-section {
        margin: 1.5rem 0;
    }
    
    .detail-section h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
    }
    
    .detail-section ul {
        list-style: none;
        padding: 0;
    }
    
    .detail-section li {
        padding: 0.25rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .detail-section li:last-child {
        border-bottom: none;
    }
    
    .price-highlight {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--secondary-color);
    }
    
    .detail-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }
    
    .detail-actions .cta-btn {
        flex: 1;
        text-align: center;
    }
`;
document.head.appendChild(style);

export { HarleyApp };
