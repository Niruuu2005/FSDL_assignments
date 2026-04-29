/**
 * Shopping Cart State Management
 */
const Cart = {
    items: [
        { id: 1, name: "Premium Hoodie", price: 59, qty: 1, icon: "👕" },
        { id: 2, name: "Canvas Tote", price: 25, qty: 1, icon: "👜" }
    ],

    updateQty(id, delta) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.qty = Math.max(0, item.qty + delta);
            if (item.qty === 0) {
                // Optional: Remove item if qty is 0
                // this.items = this.items.filter(i => i.id !== id);
            }
            this.render();
        }
    },

    get subtotal() {
        return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    },

    render() {
        const list = document.getElementById('itemList');
        list.innerHTML = this.items.map(item => `
            <div class="item">
                <div class="item-img">${item.icon}</div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price} each</p>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="Cart.updateQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="Cart.updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');

        const sub = this.subtotal;
        const tax = sub * 0.1;
        const total = sub + tax;

        document.getElementById('subtotal').innerText = `$${sub.toFixed(2)}`;
        document.getElementById('tax').innerText = `$${tax.toFixed(2)}`;
        document.getElementById('total').innerText = `$${total.toFixed(2)}`;
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => Cart.render());

// Global scope attachment
window.Cart = Cart;
