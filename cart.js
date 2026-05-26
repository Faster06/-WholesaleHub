// Shopping Cart Management
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
    try {
        const savedCart = localStorage.getItem('wholesaleCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            console.log('Cart loaded from storage:', cart);
            updateCartUI();
        }
    } catch (error) {
        console.error('Error loading cart:', error);
        cart = [];
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('wholesaleCart', JSON.stringify(cart));
        console.log('Cart saved:', cart);
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

// Add product to cart
function addToCart(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        alert('Product not found!');
        return;
    }

    // Check stock and existing quantity
    const existingItem = cart.find(item => item.id === productId);
    const desiredQuantity = existingItem ? existingItem.quantity + 1 : 1;

    if (product.stock <= 0 || desiredQuantity > product.stock) {
        showNotification('This item is no longer available.');
        console.log(`Cannot add ${product.name}: stock limit reached`);
        return;
    }

    if (existingItem) {
        existingItem.quantity = desiredQuantity;
        console.log(`Updated quantity for ${product.name}: ${existingItem.quantity}`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon
        });
        console.log(`Added ${product.name} to cart`);
    }

    saveCart();
    updateCartUI();
    
    // Show feedback
    showNotification(`${product.name} added to cart!`);
    trackAddToCart(productId);
}

// Remove product from cart
function removeFromCart(productId) {
    const product = getProductById(productId);
    cart = cart.filter(item => item.id !== productId);
    console.log(`Removed ${product?.name} from cart`);
    saveCart();
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('Product not found.');
        return;
    }

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    if (product.stock <= 0 || newQuantity > product.stock) {
        showNotification('This item is no longer available.');
        console.log(`Cannot set quantity for ${product.name}: stock limit reached`);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        console.log(`Updated ${cartItem.name} quantity to ${newQuantity}`);
        saveCart();
        updateCartUI();
    }
}

// Calculate cart total
function calculateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total;
}

// Get cart item count
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    // Update cart count badge
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const count = getCartCount();
        cartCount.textContent = count;
        console.log(`Cart count updated: ${count} items`);
    }

    // Update cart items display
    const cartItems = document.getElementById('cartItems');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <div style="font-size: 1.5rem;">${item.icon}</div>
                </div>
                <div class="cart-item-info" style="flex: 2;">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span style="min-width: 30px; text-align: center; font-weight: 600;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div style="font-weight: 600; min-width: 80px; text-align: right;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItemElement);
        });
    }

    // Update total
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        const total = calculateTotal();
        cartTotal.textContent = total.toFixed(2);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);
    console.log('Notification shown:', message);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = calculateTotal();
    const itemCount = getCartCount();
    
    const orderSummary = `
Order Summary:

Items: ${itemCount}
Total: $${total.toFixed(2)}

Thank you for your order!
We will contact you shortly to confirm.
    `;
    
    alert(orderSummary);
    console.log('Checkout completed:', { itemCount, total, items: cart });
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartUI();
    closeCart();
    showNotification('Order placed successfully! 🎉');
}

// Cart modal functions
function openCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Cart modal opened');
        updateCartUI();
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Cart modal closed');
    }
}

// View product details
function viewProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Populate modal content
    const modal = document.getElementById('productDetailModal');
    const content = document.getElementById('productDetailContent');
    if (!modal || !content) {
        // Fallback to alert if modal not present
        alert(`${product.icon} ${product.name}\n\n${product.description}\n\nPrice: $${product.price.toFixed(2)}\nIn Stock: ${product.stock} units`);
        trackProductView(productId);
        return;
    }

    content.innerHTML = `
        <div style="display:flex; gap:1rem; align-items:flex-start;">
            <div style="font-size:3rem;">${product.icon}</div>
            <div style="flex:1;">
                <h2 style="margin:0 0 .5rem 0;">${product.name}</h2>
                <p style="color:#555;">${product.description}</p>
                <p style="font-weight:700; margin: .5rem 0;">Price: $${product.price.toFixed(2)}</p>
                <p style="margin: .25rem 0;">In Stock: ${product.stock} units</p>
                <div style="margin-top: .75rem;">
                    <button class="cta-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    trackProductView(productId);
}

function closeProductDetailsModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.style.display = 'none';
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing cart...');
    loadCart();

    // Cart icon click handler
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            openCart();
        });
        console.log('Cart icon click handler attached');
    }

    // Modal close button
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCart);
        console.log('Modal close button handler attached');
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('cartModal');
        if (modal && event.target === modal) {
            closeCart();
        }
    });

    console.log('Cart initialized successfully');
});

// Add animation styles if not already present
if (!document.getElementById('cartAnimations')) {
    const style = document.createElement('style');
    style.id = 'cartAnimations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
