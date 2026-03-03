function updateAuthSection() {
    const authSection = document.getElementById('auth-section');
    const userName = localStorage.getItem('user_name');
    if (userName) {
        authSection.innerHTML = `
            <div class="profile-section">
                <div class="profile-dropdown">
                    <button class="profile-btn">
                        <span class="profile-avatar">👤</span>
                        <span class="profile-name">${userName}</span>
                        <span class="dropdown-arrow">▼</span>
                    </button>
                    <div class="dropdown-menu">
                        <a href="view_profile.html" class="dropdown-item"><span class="dropdown-icon">👤</span>View My Profile</a>
                        <a href="update_profile.html" class="dropdown-item"><span class="dropdown-icon">⚙️</span>Update My Profile</a>
                        <a href="view_events.html" class="dropdown-item"><span class="dropdown-icon">👁️</span>View Booked Event Details</a>
                        <hr class="dropdown-divider">
                        <a href="#" onclick="logout()" class="dropdown-item"><span class="dropdown-icon">🚪</span>Logout</a>
                    </div>
                </div>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <div class="auth-section">
                <a href="signIn.html" class="login-btn">Login</a>
                <a href="register.html" class="register-btn">Register</a>
            </div>
        `;
    }
}

function bookEvent(eventType) {
    const userName = localStorage.getItem('user_name');
    if (!userName) {
        alert('Please log in to book an event.');
        window.location.href = 'signin.html';
    } else {
        window.location.href = 'bookingEvent.html?event_type=' + encodeURIComponent(eventType);
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.querySelector('.mobile-menu-toggle').classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (e.target.closest('.profile-btn')) {
        e.target.closest('.profile-btn').nextElementSibling.classList.toggle('active');
        e.target.closest('.profile-btn').classList.toggle('active');
    }
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

updateAuthSection();