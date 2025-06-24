// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
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

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Favorite button functionality
document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = '#ef4444';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = '';
        }
    });
});

// Form submissions (placeholder functionality)
document.querySelectorAll('form, .newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! This is a demo - form submission is not implemented.');
    });
});

// Search functionality (placeholder)
document.querySelector('.search-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Search functionality would be implemented here in a real application.');
});

// Button click handlers (placeholder functionality)
document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.classList.contains('search-btn') && btn.type !== 'submit') {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Get Tickets') || 
                this.textContent.includes('Join Event') || 
                this.textContent.includes('Create') ||
                this.textContent.includes('Explore') ||
                this.textContent.includes('Browse') ||
                this.textContent.includes('Subscribe')) {
                e.preventDefault();
                alert(`${this.textContent} functionality would be implemented here in a real application.`);
            }
        });
    }
});

// Calendar interaction
document.querySelectorAll('.calendar-day').forEach(day => {
    day.addEventListener('click', function() {
        if (this.classList.contains('event-day')) {
            alert(`Events on ${this.textContent}: View detailed event information here.`);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .event-card, .upcoming-card, .cta-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading states for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.includes('Get Tickets') || 
            this.textContent.includes('Join Event') ||
            this.textContent.includes('Subscribe')) {
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});