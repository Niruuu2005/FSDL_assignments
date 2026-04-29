/**
 * Product Filtering Logic
 */
const Filter = {
    products: [
        { name: "MacBook Pro", cat: "tech", icon: "💻" },
        { name: "IPhone 15", cat: "tech", icon: "📱" },
        { name: "Cozy Sofa", cat: "home", icon: "🛋️" },
        { name: "Coffee Table", cat: "home", icon: "☕" },
        { name: "Running Shoes", cat: "sport", icon: "👟" },
        { name: "Yoga Mat", cat: "sport", icon: "🧘" }
    ],

    init() {
        this.render('all');
    },

    render(cat) {
        // Update UI buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${cat}'`));
        });

        const grid = document.getElementById('productGrid');
        const filtered = cat === 'all' ? this.products : this.products.filter(p => p.cat === cat);
        
        grid.innerHTML = filtered.map(p => `
            <div class="product-card">
                <div class="icon">${p.icon}</div>
                <div class="name">${p.name}</div>
                <div class="category">${p.cat}</div>
            </div>
        `).join('');
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => Filter.init());

// Global scope attachment
window.Filter = Filter;
