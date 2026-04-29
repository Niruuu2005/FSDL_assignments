const prices = {
    monthly: { basic: 19, pro: 49, ent: 99 },
    yearly: { basic: 15, pro: 39, ent: 79 }
};

function updatePrices() {
    const yearly = document.getElementById('toggle').checked;
    const mode = yearly ? 'yearly' : 'monthly';

    document.getElementById('basic-price').innerText = prices[mode].basic;
    document.getElementById('pro-price').innerText = prices[mode].pro;
    document.getElementById('ent-price').innerText = prices[mode].ent;
    document.querySelectorAll('.price span:last-child').forEach((x) => x.innerText = yearly ? '/yr' : '/mo');
}

window.updatePrices = updatePrices;
