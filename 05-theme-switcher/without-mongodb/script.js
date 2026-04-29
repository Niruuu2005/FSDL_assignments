/**
 * Theme management logic
 */
const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    },

    toggle() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        const indicator = document.getElementById('indicator');
        if (indicator) {
            indicator.innerText = theme === 'light' ? '☀️' : '🌙';
        }
        localStorage.setItem('theme', theme);
    }
};

// Start logic on load
document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
