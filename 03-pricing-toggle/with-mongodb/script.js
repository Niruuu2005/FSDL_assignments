const grid = document.getElementById('pricingGrid');
const status = document.getElementById('status');
let plans = [];

function draw() {
    const mode = document.getElementById('toggle').checked ? 'yearly' : 'monthly';
    const suffix = mode === 'yearly' ? '/yr' : '/mo';

    grid.innerHTML = plans.map(({ name, monthly, yearly, features, popular, buttonText, buttonClass }) => `
        <div class="card${popular ? ' popular' : ''}">
            ${popular ? '<div class="popular-badge">Most Popular</div>' : ''}
            <p class="plan-name">${name}</p>
            <div class="price">$${mode === 'yearly' ? yearly : monthly}<span>${suffix}</span></div>
            <ul class="features">${features.map((x) => `<li>${x}</li>`).join('')}</ul>
            <a href="#" class="btn${buttonClass ? ` ${buttonClass}` : ''}">${buttonText}</a>
        </div>
    `).join('');
}

async function loadPlans() {
    const res = await fetch('/api/plans');
    plans = await res.json();
    draw();
}

function updatePrices() {
    draw();
}

window.updatePrices = updatePrices;
loadPlans().catch(() => status.textContent = 'Could not load MongoDB data.');
