const status = document.getElementById('status');

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.getElementById('indicator').innerText = theme === 'light' ? '☀️' : '🌙';
}

async function loadTheme() {
    const res = await fetch('/api/theme');
    const { theme } = await res.json();
    setTheme(theme || 'light');
}

async function toggleTheme() {
    const theme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(theme);
    await fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme })
    });
    status.textContent = 'Saved to MongoDB';
}

document.querySelector('.theme-toggle').addEventListener('click', () => {
    toggleTheme().catch(() => status.textContent = 'Could not save MongoDB data.');
});

loadTheme().catch(() => status.textContent = 'Could not load MongoDB data.');
