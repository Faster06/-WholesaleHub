// Sample product data for wholesale marketplace
const productsData = [
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 49.99,
        description: 'Premium quality wireless headphones with noise cancellation',
        icon: '🎧',
        stock: 150
    },
    {
        id: 2,
        name: 'USB-C Cable Bundle',
        category: 'electronics',
        price: 19.99,
        description: 'Pack of 5 durable USB-C cables, fast charging',
        icon: '🔌',
        stock: 500
    },
    {
        id: 3,
        name: 'Professional T-Shirts',
        category: 'clothing',
        price: 12.99,
        description: 'Bulk pack of 10 high-quality cotton t-shirts',
        icon: '👕',
        stock: 300
    },
    {
        id: 4,
        name: 'Stainless Steel Bottles',
        category: 'home',
        price: 24.99,
        description: 'Set of 6 insulated water bottles, keeps drinks cold for 24 hours',
        icon: '🍶',
        stock: 200
    },
    {
        id: 5,
        name: 'Sports Yoga Mats',
        category: 'sports',
        price: 39.99,
        description: 'Pack of 4 non-slip yoga mats, eco-friendly material',
        icon: '🧘',
        stock: 100
    },
    {
        id: 6,
        name: 'LED Desk Lamps',
        category: 'home',
        price: 34.99,
        description: 'Pack of 3 adjustable LED desk lamps with USB charging',
        icon: '💡',
        stock: 120
    },
    {
        id: 7,
        name: 'Wireless Chargers',
        category: 'electronics',
        price: 29.99,
        description: 'Fast wireless charging pads, compatible with all phones',
        icon: '⚡',
        stock: 250
    },
    {
        id: 8,
        name: 'Winter Jackets',
        category: 'clothing',
        price: 59.99,
        description: 'Bulk pack of 5 waterproof winter jackets',
        icon: '🧥',
        stock: 80
    },
    {
        id: 9,
        name: 'Kitchen Knife Set',
        category: 'home',
        price: 44.99,
        description: 'Professional 8-piece stainless steel knife set',
        icon: '🔪',
        stock: 90
    },
    {
        id: 10,
        name: 'Bluetooth Speakers',
        category: 'electronics',
        price: 89.99,
        description: 'High-quality portable Bluetooth speakers, 360° sound',
        icon: '🔊',
        stock: 110
    },
    {
        id: 11,
        name: 'Hiking Backpacks',
        category: 'sports',
        price: 69.99,
        description: 'Durable 50L hiking backpacks with rain cover',
        icon: '🎒',
        stock: 75
    },
    {
        id: 12,
        name: 'Smart Watch Bundle',
        category: 'electronics',
        price: 79.99,
        description: 'Pack of 2 fitness smartwatches with heart rate monitor',
        icon: '⌚',
        stock: 95
    }
];

// Function to display products
function displayProducts(products = productsData) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d; padding: 2rem;">No products found matching your criteria.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-footer">
                    <button class="product-btn add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="product-btn view-details-btn" onclick="viewProductDetails(${product.id})">Details</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Function to get product by ID
function getProductById(id) {
    return productsData.find(product => product.id === id);
}

// Function to filter products by category
function filterByCategory(category) {
    if (!category) return productsData;
    return productsData.filter(product => product.category === category);
}

// Function to filter products by price
function filterByPrice(priceRange) {
    if (!priceRange) return productsData;

    return productsData.filter(product => {
        switch (priceRange) {
            case '0-100':
                return product.price >= 0 && product.price <= 100;
            case '100-500':
                return product.price >= 100 && product.price <= 500;
            case '500-1000':
                return product.price >= 500 && product.price <= 1000;
            case '1000+':
                return product.price >= 1000;
            default:
                return true;
        }
    });
}

// Function to search products
function searchProducts(query) {
    if (!query.trim()) return productsData;
    
    const lowerQuery = query.toLowerCase();
    return productsData.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
}

// Function to sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];

    if (!sortBy || sortBy === 'featured') {
        return sorted;
    }

    switch (sortBy) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            console.log('Sorted by price: Low to High');
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            console.log('Sorted by price: High to Low');
            break;
        case 'newest':
            sorted.reverse();
            console.log('Sorted by newest');
            break;
        default:
            break;
    }

    return sorted;
}

// Function to apply all filters
function applyFilters() {
    try {
        const categoryFilter = document.getElementById('categoryFilter')?.value || '';
        const priceFilter = document.getElementById('priceFilter')?.value || '';
        const sortFilter = document.getElementById('sortFilter')?.value || 'featured';
        const searchQuery = document.getElementById('searchInput')?.value || '';

        console.log('Applying filters:', { categoryFilter, priceFilter, sortFilter, searchQuery });

        let filteredProducts = [...productsData];

        // Apply search first
        if (searchQuery.trim()) {
            filteredProducts = searchProducts(searchQuery);
            console.log(`Search found ${filteredProducts.length} products`);
        }

        // Apply category filter
        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
            console.log(`Category filter applied: ${filteredProducts.length} products`);
        }

        // Apply price filter
        if (priceFilter) {
            filteredProducts = filteredProducts.filter(p => {
                const price = p.price;
                switch (priceFilter) {
                    case '0-100':
                        return price >= 0 && price <= 100;
                    case '100-500':
                        return price >= 100 && price <= 500;
                    case '500-1000':
                        return price >= 500 && price <= 1000;
                    case '1000+':
                        return price >= 1000;
                    default:
                        return true;
                }
            });
            console.log(`Price filter applied: ${filteredProducts.length} products`);
        }

        // Apply sorting
        filteredProducts = sortProducts(filteredProducts, sortFilter);

        displayProducts(filteredProducts);
    } catch (error) {
        console.error('Error applying filters:', error);
    }
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing products display...');
    console.log(`Total products available: ${productsData.length}`);
    displayProducts();
    console.log('Products displayed successfully');
});
