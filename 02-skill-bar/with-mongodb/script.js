const list = document.getElementById('skillsList');
const status = document.getElementById('status');

const draw = (items) => {
    list.innerHTML = items.map(({ name, value }) => `
        <div class="skill-item">
            <div class="skill-header"><span>${name}</span><span>${value}%</span></div>
            <div class="progress-container"><div class="progress-bar" style="width:${value}%"></div></div>
        </div>
    `).join('');
};

async function loadSkills() {
    const res = await fetch('/api/skills');
    draw(await res.json());
}

async function addSkill() {
    const name = document.getElementById('skillName').value.trim();
    const value = Number(document.getElementById('skillValue').value);

    if (!name || value < 0 || value > 100) return;

    await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, value })
    });

    document.getElementById('skillName').value = '';
    document.getElementById('skillValue').value = '';
    status.textContent = '';
    loadSkills();
}

window.addSkill = addSkill;
loadSkills().catch(() => status.textContent = 'Could not load MongoDB data.');
