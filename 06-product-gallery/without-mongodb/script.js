/**
 * Gallery logic with fetch
 */
const Gallery = {
    async init() {
        try {
            const response = await fetch('products.json');
            const products = await response.json();
            this.render(products);
        } catch (error) {
            console.error("Error loading products:", error);
            document.getElementById('productGallery').innerHTML = "<p>Error loading product data.</p>";
        }
    },

    render(products) {
        const container = document.getElementById('productGallery');
        container.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="img-placeholder">
                    ${p.tag ? `<span class="badge">${p.tag}</span>` : ''}
                    ${p.icon}
                </div>
                <div class="content">
                    <div class="category">${p.category}</div>
                    <div class="title">${p.name}</div>
                    <div class="price-row">
                        <div class="price">$${p.price}</div>
                        <button class="buy-btn" onclick="Gallery.addToCart('${p.name}')">Buy Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    addToCart(name) {
        const notification = document.getElementById('notification');
        notification.innerText = `${name} added to cart! 🛒`;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 3000);
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => Gallery.init());

// Global scope attachment for inline events
window.Gallery = Gallery;
