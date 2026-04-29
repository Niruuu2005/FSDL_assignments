/**
 * Accordion interaction logic
 */
function toggleFaq(el) {
    const item = el.parentElement;
    const isActive = item.classList.contains('active');
    
    // Optional: Close other open items
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    if (!isActive) {
        item.classList.add('active');
    }
}

// Global scope attachment
window.toggleFaq = toggleFaq;
