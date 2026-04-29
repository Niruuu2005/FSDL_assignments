/**
 * String Operations logic
 */
const StringOps = {
    process() {
        const input = document.getElementById('strInput').value;
        
        document.getElementById('res-len').innerText = input.length;
        document.getElementById('res-rev').innerText = input.split('').reverse().join('');
        document.getElementById('res-upper').innerText = input.toUpperCase();
        document.getElementById('res-lower').innerText = input.toLowerCase();
    },

    clear() {
        document.getElementById('strInput').value = '';
        this.process();
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('strInput').addEventListener('input', () => StringOps.process());
});

// Global scope attachment
window.StringOps = StringOps;
