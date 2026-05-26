// Authentication Management System

// Store users in localStorage
const USERS_KEY = 'wholesaleUsers';
const CURRENT_USER_KEY = 'currentWholesaleUser';

// Initialize users with default admin account
function initializeUsers() {
    const existingUsers = localStorage.getItem(USERS_KEY);
    
    if (!existingUsers) {
        const defaultUsers = [
            {
                id: 1,
                username: 'admin',
                email: 'admin@wholesalehub.com',
                password: hashPassword('admin123'), // In real app, use bcrypt
                name: 'Admin User',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                username: 'demo',
                email: 'demo@wholesalehub.com',
                password: hashPassword('demo123'),
                name: 'Demo User',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
        console.log('✅ Default users initialized');
        console.log('Demo accounts:');
        console.log('  Username: admin, Password: admin123');
        console.log('  Username: demo, Password: demo123');
    }
}

// Simple password hashing (in production, use bcrypt on backend)
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
}

// Verify password
function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}

// Get all users
function getAllUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
}

// Register new user
function registerUser(username, email, password, name) {
    console.log('Attempting registration for:', username);
    
    // Validation
    if (!username || !email || !password || !name) {
        return { success: false, error: 'All fields are required' };
    }

    if (username.length < 3) {
        return { success: false, error: 'Username must be at least 3 characters' };
    }

    if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, error: 'Invalid email address' };
    }

    const users = getAllUsers();

    // Check if username exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return { success: false, error: 'Username already exists' };
    }

    // Check if email exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'Email already exists' };
    }

    // Create new user
    const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: username,
        email: email,
        password: hashPassword(password),
        name: name,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    console.log('✅ User registered successfully:', username);
    return { success: true, message: 'Registration successful! You can now login.' };
}

// Login user
function loginUser(username, password) {
    console.log('Login attempt for:', username);
    
    if (!username || !password) {
        return { success: false, error: 'Username and password are required' };
    }

    const users = getAllUsers();
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (!user) {
        return { success: false, error: 'Invalid username or password' };
    }

    if (!verifyPassword(password, user.password)) {
        return { success: false, error: 'Invalid username or password' };
    }

    // Create session token
    const sessionToken = {
        userId: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionToken));
    console.log('✅ User logged in successfully:', username);
    
    return { 
        success: true, 
        message: 'Login successful!',
        user: sessionToken
    };
}

// Logout user
function logoutUser() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        console.log('User logged out:', currentUser.username);
    }
    localStorage.removeItem(CURRENT_USER_KEY);
    console.log('✅ User session cleared');
}

// Get current logged-in user
function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Update user profile
function updateUserProfile(username, name, email) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, error: 'No user logged in' };
    }

    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.userId);

    if (userIndex === -1) {
        return { success: false, error: 'User not found' };
    }

    // Check if new username/email already exist
    const newUsername = username || users[userIndex].username;
    const newEmail = email || users[userIndex].email;

    if (username && users.some(u => u.id !== currentUser.userId && u.username.toLowerCase() === newUsername.toLowerCase())) {
        return { success: false, error: 'Username already taken' };
    }

    if (email && users.some(u => u.id !== currentUser.userId && u.email.toLowerCase() === newEmail.toLowerCase())) {
        return { success: false, error: 'Email already in use' };
    }

    // Update user
    users[userIndex].username = newUsername;
    users[userIndex].name = name || users[userIndex].name;
    users[userIndex].email = newEmail;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Update current session
    currentUser.username = newUsername;
    currentUser.name = users[userIndex].name;
    currentUser.email = newEmail;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

    console.log('✅ User profile updated:', newUsername);
    return { success: true, message: 'Profile updated successfully' };
}

// Change password
function changePassword(currentPassword, newPassword) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        return { success: false, error: 'No user logged in' };
    }

    if (!currentPassword || !newPassword) {
        return { success: false, error: 'Current and new password are required' };
    }

    if (newPassword.length < 6) {
        return { success: false, error: 'New password must be at least 6 characters' };
    }

    const users = getAllUsers();
    const user = users.find(u => u.id === currentUser.userId);

    if (!user) {
        return { success: false, error: 'User not found' };
    }

    if (!verifyPassword(currentPassword, user.password)) {
        return { success: false, error: 'Current password is incorrect' };
    }

    user.password = hashPassword(newPassword);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    console.log('✅ Password changed for user:', currentUser.username);
    return { success: true, message: 'Password changed successfully' };
}

// Initialize auth system
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing auth system...');
    initializeUsers();
    
    const currentUser = getCurrentUser();
    if (currentUser) {
        console.log('📧 Logged in as:', currentUser.username);
        if (typeof updateUIForLoggedInUser === 'function') {
            updateUIForLoggedInUser(currentUser);
        }
    } else {
        console.log('No user logged in');
        if (typeof updateUIForLoggedOutUser === 'function') {
            updateUIForLoggedOutUser();
        }
    }
});

// Update UI when user is logged in
function updateUIForLoggedInUser(user) {
    // This function will be called to update navigation
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    // Remove any existing login button or profile element
    navActions.querySelectorAll('.login-btn, .user-profile').forEach(el => el.remove());

    // Create profile container with a toggleable dropdown
    const profileDiv = document.createElement('div');
    profileDiv.className = 'user-profile';
    profileDiv.style.position = 'relative';

    profileDiv.innerHTML = `
        <button class="profile-btn">👤 ${user.name}</button>
        <div class="profile-dropdown" style="display:none; position: absolute; right: 0; background: #fff; border: 1px solid #ddd; box-shadow: 0 6px 18px rgba(0,0,0,.08); padding: 0.5rem; z-index:1000; min-width:160px;">
            <a href="#" class="profile-link" style="display:block; padding:8px 10px; color:#333; text-decoration:none;">My Profile</a>
            <a href="#" class="logout-link" style="display:block; padding:8px 10px; color:#333; text-decoration:none;">Logout</a>
        </div>
    `;

    navActions.appendChild(profileDiv);

    const profileBtn = profileDiv.querySelector('.profile-btn');
    const dropdown = profileDiv.querySelector('.profile-dropdown');

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // My Profile link
    profileDiv.querySelector('.profile-link').addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.style.display = 'none';
        if (typeof openProfileModal === 'function') openProfileModal();
    });

    // Logout link
    profileDiv.querySelector('.logout-link').addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.style.display = 'none';
        logoutAndRefresh();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
    });
}

// Update UI when user logs out
function updateUIForLoggedOutUser() {
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.remove();
    }

    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    // Ensure we don't duplicate login button
    if (!navActions.querySelector('.login-btn')) {
        const loginBtn = document.createElement('button');
        loginBtn.className = 'login-btn';
        loginBtn.textContent = '🔐 Login';
        loginBtn.addEventListener('click', () => openLoginModal());
        navActions.insertBefore(loginBtn, navActions.firstChild);
    }
}

// Logout and refresh UI
function logoutAndRefresh() {
    logoutUser();
    updateUIForLoggedOutUser();
    showNotification('You have been logged out successfully', 'success');
    
    // Redirect to login after short delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Export functions for global use
window.loginUser = loginUser;
window.registerUser = registerUser;
window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;
window.isLoggedIn = isLoggedIn;
window.updateUserProfile = updateUserProfile;
window.changePassword = changePassword;
window.logoutAndRefresh = logoutAndRefresh;
window.updateUIForLoggedInUser = updateUIForLoggedInUser;
window.updateUIForLoggedOutUser = updateUIForLoggedOutUser;

console.log('✅ Authentication system loaded');
