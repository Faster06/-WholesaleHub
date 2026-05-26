# WholesaleHub - Wholesale Marketplace Website

A modern, responsive wholesale marketplace website built with HTML, CSS, and JavaScript.

## Features

### 🛍️ Product Catalog
- 12 sample wholesale products across multiple categories
- Beautiful product cards with detailed information
- Quick view product details functionality
- Emoji-based product icons for visual appeal

### 🔍 Advanced Search & Filtering
- **Search Bar**: Find products by name, description, or category
- **Category Filter**: Filter by Electronics, Clothing, Home & Kitchen, Sports & Outdoors
- **Price Range Filter**: Filter products by price brackets
- **Smart Sorting**: Sort by Featured, Price (Low-High, High-Low), or Newest

### 🛒 Shopping Cart
- Add products to cart with quantity selection
- View and manage cart items
- Increase/decrease quantities on the fly
- Remove items from cart
- Real-time cart total calculation
- Cart persistence (saves to browser's localStorage)
- Checkout functionality

### 📱 Responsive Design
- Fully responsive for desktop, tablet, and mobile devices
- Mobile-first approach
- Touch-friendly interface
- Optimized navigation for small screens

### 📞 Contact Form
- User-friendly contact form
- Email validation
- Form submission handling
- Thank you message after submission

### 🎨 Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Color-coded sections
- Intuitive navigation
- Sticky navigation bar

## File Structure

```
wholesale marketplace/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Main stylesheet
│   ├── readme.js          # (Empty - can be used for notes)
│   └── JS/
│       ├── products.js    # Product data and filtering logic
│       ├── cart.js        # Shopping cart management
│       └── main.js        # Main application logic and utilities
└── README.md              # This file
```

## How to Use

### 1. View the Website
Simply open `index.html` in a web browser to view the wholesale marketplace.

### 2. Browse Products
- Scroll through all products in the "Featured Products" section
- Use filters to find specific products by category, price, or sort order
- Use the search bar to quickly find products

### 3. Add to Cart
- Click "Add to Cart" button on any product
- Click the cart icon (🛒) in the top right to view your cart
- Adjust quantities using +/- buttons
- Remove items by clicking "Remove"

### 4. Checkout
- Click "Proceed to Checkout" to complete your order
- A confirmation message will appear with your order summary

### 5. Contact
- Scroll to the "Get In Touch" section
- Fill in your name, email, and message
- Click "Send Message" to submit your inquiry

## Customization Guide

### Adding New Products

Edit `css/JS/products.js` and add to the `productsData` array:

```javascript
{
    id: 13,
    name: 'Your Product Name',
    category: 'electronics', // or 'clothing', 'home', 'sports'
    price: 99.99,
    description: 'Product description here',
    icon: '🎯', // Any emoji
    stock: 150
}
```

### Changing Colors

Edit the CSS variables at the top of `css/main.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Dark blue */
    --accent-color: #e74c3c;       /* Red/Orange */
    --secondary-color: #3498db;    /* Light blue */
    --light-bg: #ecf0f1;           /* Light gray */
    --text-dark: #2c3e50;          /* Dark text */
    --text-light: #7f8c8d;         /* Light text */
    --border-color: #bdc3c7;       /* Border */
    --success-color: #27ae60;      /* Green */
}
```

### Adding New Categories

1. Update category options in the select element in `index.html`
2. Add corresponding category in product filtering logic in `css/JS/products.js`
3. Ensure new products use the new category name

### Extending Cart Functionality

- Integrate with a backend API for persistent cart storage
- Add discount code functionality
- Implement order history
- Add wishlist feature

## JavaScript Features

### Event Listeners
- Filter and search input handlers
- Cart management (add, remove, update quantity)
- Contact form submission
- Smooth scrolling for navigation
- Sticky header on scroll

### Local Storage
- Shopping cart is automatically saved to browser storage
- Cart persists across browser sessions

### Notifications
- Toast-style notifications for user feedback
- Success messages when items are added to cart

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Backend Integration**
   - Connect to a database for real product data
   - Implement user authentication
   - Process real payments

2. **Advanced Features**
   - User accounts and order history
   - Product reviews and ratings
   - Wishlist functionality
   - Bulk order pricing
   - Inventory management

3. **Analytics**
   - Track user behavior
   - Monitor popular products
   - Sales analytics

4. **Performance**
   - Image optimization
   - Lazy loading for products
   - Caching strategies
   - SEO optimization

5. **Security**
   - Input validation
   - CSRF protection
   - Secure checkout process

## Tips for Success

- **Clean URLs**: Consider using a backend router for better URLs
- **Database**: Migrate from hardcoded data to a real database
- **API**: Create RESTful endpoints for products, orders, and users
- **Payment Gateway**: Integrate Stripe, PayPal, or similar for real payments
- **Email**: Set up email notifications for orders and inquiries
- **Analytics**: Add Google Analytics for tracking user behavior

## Support

For any issues or questions about the website, please refer to the inline code comments or check the HTML/CSS structure.

---

**WholesaleHub** - Your trusted platform for wholesale purchases at competitive prices! 📦
