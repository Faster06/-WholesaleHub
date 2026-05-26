// Main Application Logic & Event Handlers

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== WholesaleHub Marketplace Initialized ===');
    initializeEventListeners();
    initializeContactForm();
    initializeNavigationScroll();
    trackPageView();
    console.log('All systems ready!');
});

// Initialize all event listeners for filters and search
function initializeEventListeners() {
    console.log('Initializing event listeners...');
    
    // Category filter change
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            console.log('Category changed:', categoryFilter.value);
            applyFilters();
        });
    }

    // Price filter change
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', () => {
            console.log('Price filter changed:', priceFilter.value);
            applyFilters();
        });
    }

    // Sort filter change
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', () => {
            console.log('Sort filter changed:', sortFilter.value);
            applyFilters();
        });
    }

    // Search input with debouncing for performance
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Clear previous timeout if exists
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const searchQuery = e.target.value;
            console.log('Search input:', searchQuery);
            
            // Debounce search to 300ms
            searchTimeout = setTimeout(() => {
                applyFilters();
            }, 300);
        });

        // Search on Enter key press
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(searchTimeout);
                console.log('Search triggered by Enter key');
                applyFilters();
            }
        });
    }

    // Search button click
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Search button clicked');
            applyFilters();
        });
    }

    console.log('Event listeners initialized successfully');
}

// Initialize contact form submission
function initializeContactForm() {
    console.log('Initializing contact form...');
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contact form submitted');
        
        try {
            // Get form values
            const inputs = contactForm.querySelectorAll('input, textarea');
            const name = inputs[0]?.value || '';
            const email = inputs[1]?.value || '';
            const message = inputs[2]?.value || '';

            // Simple validation
            if (!name.trim() || !email.trim() || !message.trim()) {
                alert('Please fill in all fields!');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address!');
                return;
            }

            // Log submission
            console.log('Form data valid:', { name, email, message });
            
            // Show success message
            const successMsg = `Thank you ${name}! We received your message and will get back to you at ${email} soon.`;
            alert(successMsg);
            console.log(successMsg);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Error processing contact form:', error);
            alert('An error occurred. Please try again.');
        }
    });

    console.log('Contact form initialized');
}

// Initialize smooth scrolling for navigation
function initializeNavigationScroll() {
    console.log('Initializing navigation scroll...');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    console.log('Scrolled to:', href);
                }
            }
        });
    });
}

// Sticky header scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Add to cart with quantity selection
function addToCartWithQuantity(productId) {
    const quantity = prompt('Enter quantity:', '1');
    
    if (quantity === null) {
        return; // User clicked cancel
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
        alert('Please enter a valid quantity!');
        return;
    }

    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            icon: product.icon
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${qty} × ${product.name} added to cart!`);
    trackAddToCart(productId);
}

// Analytics - Track page views
function trackPageView() {
    const currentPage = window.location.pathname || 'index.html';
    console.log('📊 Page viewed:', currentPage, new Date().toLocaleString());
}

// Track product views
function trackProductView(productId) {
    const product = getProductById(productId);
    console.log('👁️ Product viewed:', productId, product?.name, new Date().toLocaleString());
}

// Track add to cart
function trackAddToCart(productId) {
    const product = getProductById(productId);
    console.log('🛒 Product added to cart:', productId, product?.name, new Date().toLocaleString());
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Easter egg - Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key === konamiCode[konamiIndex]) {
        konamiIndex++;
        console.log(`Konami code progress: ${konamiIndex}/${konamiCode.length}`);
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const message = "🎉 You found the Easter Egg! Welcome to WholesaleHub! 🎉";
    showNotification(message);
    console.log('🥚 Easter Egg Activated!');
    
    // Add colorful visual effect
    const originalFilter = document.body.style.filter;
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            document.body.style.filter = `hue-rotate(${i * 20}deg)`;
        }, i * 300);
    }
    
    setTimeout(() => {
        document.body.style.filter = originalFilter;
    }, 900);
}

// Profile Modal Functions
function openProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        const currentUser = getCurrentUser();
        if (currentUser) {
            displayProfileContent(currentUser);
            modal.style.display = 'block';
            console.log('Profile modal opened for:', currentUser.username);
        } else {
            window.location.href = 'login.html';
        }
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Profile modal closed');
    }
}

function displayProfileContent(user) {
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;

    const joinDate = new Date(user.loginTime).toLocaleDateString();

    profileContent.innerHTML = `
        <div class="profile-section">
            <h3>Account Information</h3>
            <div class="profile-info-row">
                <span class="profile-info-label">Name:</span>
                <span class="profile-info-value">${user.name}</span>
            </div>
            <div class="profile-info-row">
                <span class="profile-info-label">Username:</span>
                <span class="profile-info-value">@${user.username}</span>
            </div>
            <div class="profile-info-row">
                <span class="profile-info-label">Email:</span>
                <span class="profile-info-value">${user.email}</span>
            </div>
            <div class="profile-info-row">
                <span class="profile-info-label">Member Since:</span>
                <span class="profile-info-value">${joinDate}</span>
            </div>
        </div>
        
        <div class="profile-section">
            <h3>Shopping Information</h3>
            <div class="profile-info-row">
                <span class="profile-info-label">Items in Cart:</span>
                <span class="profile-info-value">${getCartCount()} items</span>
            </div>
            <div class="profile-info-row">
                <span class="profile-info-label">Cart Total:</span>
                <span class="profile-info-value">$${calculateTotal().toFixed(2)}</span>
            </div>
        </div>
        
        <div class="profile-actions">
            <button class="profile-btn profile-btn-secondary" onclick="closeProfileModal()">Close</button>
            <button class="profile-btn profile-btn-primary" onclick="logoutAndRefresh()">Logout</button>
        </div>
    `;
}

// Login Modal Functions
function openLoginModal() {
    window.location.href = 'login.html';
}

// Close modal on outside click
window.addEventListener('click', (event) => {
    const profileModal = document.getElementById('profileModal');
    if (profileModal && event.target === profileModal) {
        closeProfileModal();
    }
});

// Export functions for global use
window.addToCartWithQuantity = addToCartWithQuantity;
window.trackProductView = trackProductView;
window.trackAddToCart = trackAddToCart;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.openCart = openCart;
window.closeCart = closeCart;
window.applyFilters = applyFilters;
window.openProfileModal = openProfileModal;
window.closeProfileModal = closeProfileModal;
window.openLoginModal = openLoginModal;

console.log('✅ Main application script loaded');
