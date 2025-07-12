// All Pro Irrigation - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });

    // Enhanced form validation and submission
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        const formFields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            service: document.getElementById('service'),
            message: document.getElementById('message')
        };

        // Real-time validation
        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            if (field) {
                field.addEventListener('blur', () => validateField(fieldName, field));
                field.addEventListener('input', () => clearError(fieldName));
            }
        });

        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all required fields
            isValid = validateField('name', formFields.name) && isValid;
            isValid = validateField('email', formFields.email) && isValid;
            isValid = validateField('service', formFields.service) && isValid;
            
            // Validate phone if provided
            if (formFields.phone.value.trim()) {
                isValid = validateField('phone', formFields.phone) && isValid;
            }

            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('.form-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Submit via Netlify (form will handle the actual submission)
                this.submit();
            } else {
                // Show error message
                showFormMessage('Please correct the errors above.', 'error');
            }
        });
    }

    // Form validation functions
    function validateField(fieldName, field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch(fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            
            case 'phone':
                if (value) {
                    const phoneRegex = /^[\d\s\(\)\-\+\.]{10,}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        errorMessage = 'Please enter a valid phone number';
                        isValid = false;
                    }
                }
                break;
            
            case 'service':
                if (!value) {
                    errorMessage = 'Please select a service';
                    isValid = false;
                }
                break;
        }

        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }

        field.classList.toggle('error', !isValid);
        return isValid;
    }

    function clearError(fieldName) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.remove('error');
        }
    }

    function showFormMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        const form = document.querySelector('.quote-form');
        form.insertBefore(messageEl, form.firstChild);

        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .credential-item, .portfolio-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Click to call tracking (for analytics)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone call clicks (replace with your analytics code)
            console.log('Phone call initiated:', this.href);
        });
    });

    // Mobile menu toggle (if needed)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});