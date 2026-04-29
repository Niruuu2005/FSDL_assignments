const Gallery = {
    async init() {
        try {
            const response = await fetch('/api/products');
            this.render(await response.json());
        } catch (error) {
            document.getElementById('status').innerText = 'Could not load MongoDB data.';
        }
    },

    render(products) {
        document.getElementById('productGallery').innerHTML = products.map((p) => `
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

document.addEventListener('DOMContentLoaded', () => Gallery.init());
window.Gallery = Gallery;
