

// Enhanced login form functionality
class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.loginBtn = this.form.querySelector('.login-btn');
        this.inputs = this.form.querySelectorAll('input');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Add input validation and animations
        this.inputs.forEach(input => {
            input.addEventListener('blur', this.validateInput.bind(this));
            input.addEventListener('focus', this.clearValidation.bind(this));
            input.addEventListener('input', this.handleInput.bind(this));
        });
        
        // Add social login handlers
        this.setupSocialLogin();
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
        this.showLoading();
        
        // Simulate login process
        setTimeout(() => {
            this.hideLoading();
            this.showSuccess();
        }, 2000);
        }
    }
    
    validateForm() {
        let isValid = true;
        
        this.inputs.forEach(input => {
            if (!this.validateInput({ target: input })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateInput(e) {
        const input = e.target;
        const wrapper = input.closest('.input-wrapper');
        const value = input.value.trim();
        
        // Remove existing validation classes
        wrapper.classList.remove('success', 'error');
        
        if (value === '') {
            wrapper.classList.add('error');
            return false;
        }
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                wrapper.classList.add('error');
                return false;
            }
        }
        
        if (input.type === 'password') {
            if (value.length < 6) {
                wrapper.classList.add('error');
                return false;
            }
        }
        
        wrapper.classList.add('success');
        return true;
    }
    
    clearValidation(e) {
        const wrapper = e.target.closest('.input-wrapper');
        wrapper.classList.remove('success', 'error');
    }
    
    handleInput(e) {
        // Real-time validation for better UX
        if (e.target.value.trim() !== '') {
            setTimeout(() => this.validateInput(e), 500);
        }
    }
    
    showLoading() {
        this.loginBtn.classList.add('loading');
        this.loginBtn.disabled = true;
    }
    
    hideLoading() {
        this.loginBtn.classList.remove('loading');
        this.loginBtn.disabled = false;
    }
    
    showSuccess() {
        // Create success animation
        const card = document.querySelector('.login-card');
        card.style.transform = 'scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.2)';
        
        setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        
        // Show success message
        this.showNotification('Login successful! Welcome back.', 'success');
        }, 200);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        `;
        
        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? 'var(--success-color)' : 'var(--accent-blue)',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    setupSocialLogin() {
        const socialBtns = document.querySelectorAll('.social-btn');
        
        socialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const provider = btn.classList.contains('apple-btn') ? 'Apple' : btn.classList.contains('google-btn') ? 'Google' : 'Twitter';
                
                // Add click animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'translateY(-2px)';
                }, 150);
                
                this.showNotification(`${provider} login coming soon!`, 'info');
            });
        });
    }
    
    handleKeyboard(e) {
        // Enter key to submit
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeElement = document.activeElement;
            if (activeElement.tagName === 'INPUT') {
                e.preventDefault();
                this.form.dispatchEvent(new Event('submit'));
            }
        }
    }
}

// Particle animation for background
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6';
        
        document.body.appendChild(this.canvas);
        this.resize();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
        // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(30, 144, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
    new ParticleSystem();
    
    // Add some entrance animations
    const elements = document.querySelectorAll('.input-wrapper, .social-btn');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
        el.style.transition = 'all 0.6s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });
});