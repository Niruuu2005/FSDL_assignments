/**
 * Gallery interactions
 */
const Gallery = {
    openLightbox(emoji) {
        const lb = document.getElementById('lightbox');
        const content = document.getElementById('lb-content');
        content.innerText = emoji;
        lb.classList.add('active');
    },

    closeLightbox() {
        const lb = document.getElementById('lightbox');
        lb.classList.remove('active');
    }
};

// Global scope attachment
window.Gallery = Gallery;
