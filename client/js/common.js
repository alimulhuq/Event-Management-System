// client/js/common.js
// Shared logic for all pages: navbar, auth display, logout, mobile menu, etc.

function updateAuthSection() {
    const section = document.getElementById('auth-section');
    if (!section) return;

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('user_name') || 'User';

    if (token && name) {
        section.innerHTML = `
            <div class="profile-section">
                <div class="profile-dropdown">
                    <button class="profile-btn" aria-label="User menu">
                        <span class="profile-avatar">👤</span>
                        <span class="profile-name">${name}</span>
                        <span class="dropdown-arrow">▼</span>
                    </button>
                    <div class="dropdown-menu">
                        <a href="view_profile.html" class="dropdown-item">
                            <span class="dropdown-icon">👤</span> View Profile
                        </a>
                        <a href="update_profile.html" class="dropdown-item">
                            <span class="dropdown-icon">⚙️</span> Update Profile
                        </a>
                        <a href="view_events.html" class="dropdown-item">
                            <span class="dropdown-icon">📅</span> My Bookings
                        </a>
                        <hr class="dropdown-divider">
                        <a href="#" onclick="logout(); return false;" class="dropdown-item danger">
                            <span class="dropdown-icon">🚪</span> Logout
                        </a>
                    </div>
                </div>
            </div>
        `;
    } else {
        section.innerHTML = `
            <div class="auth-links">
                <a href="signIn.html" class="login-btn">Login</a>
                <a href="register.html" class="register-btn">Register</a>
            </div>
        `;
    }
}

function logout() {
    // Only remove auth-related items — keep other settings if any
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_id');

    // Optional: clear any other session data
    // localStorage.removeItem('preferredTheme'); etc.

    window.location.href = 'index.html';
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// Close dropdown when clicking outside
function initDropdownClose() {
    document.addEventListener('click', (e) => {
        const isClickInside = e.target.closest('.profile-section');
        if (!isClickInside) {
            document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
                menu.classList.remove('active');
                menu.previousElementSibling?.classList.remove('active');
            });
        }
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}

// Quick booking redirect helper (used in index.html)
function bookEvent(eventType) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please login to book an event.');
        window.location.href = 'signIn.html';
        return;
    }
    window.location.href = `bookingEvent.html?event_type=${encodeURIComponent(eventType)}`;
}

// Initialize shared behaviors on every page
document.addEventListener('DOMContentLoaded', () => {
    updateAuthSection();
    initMobileMenu();
    initDropdownClose();
    initNavbarScroll();
});