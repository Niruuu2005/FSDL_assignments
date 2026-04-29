/**
 * Navbar scroll behavior
 */
function handleScroll() {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Add scroll listener
window.addEventListener('scroll', handleScroll);

// Optional: Mobile menu toggle logic could be added here
