/**
 * Gallery Filtering Logic
 */
const Gallery = {
    filter(cat, btn) {
        // Update Buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update Items
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            const itemCat = item.getAttribute('data-cat');
            if (cat === 'all' || itemCat === cat) {
                item.classList.remove('hide');
                // Use a small delay to trigger CSS transition if needed
                item.style.display = 'block';
            } else {
                item.classList.add('hide');
                setTimeout(() => {
                    if (item.classList.contains('hide')) item.style.display = 'none';
                }, 400);
            }
        });
    }
};

// Global scope attachment
window.Gallery = Gallery;
