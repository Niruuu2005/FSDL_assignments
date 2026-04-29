function addSkill() {
    const name = document.getElementById('skillName').value.trim();
    const value = document.getElementById('skillValue').value;

    if (!name || value === '' || value < 0 || value > 100) return;

    document.getElementById('skillsList').innerHTML += `
        <div class="skill-item">
            <div class="skill-header"><span>${name}</span><span>${value}%</span></div>
            <div class="progress-container"><div class="progress-bar" style="width:${value}%"></div></div>
        </div>
    `;

    document.getElementById('skillName').value = '';
    document.getElementById('skillValue').value = '';
}

window.addSkill = addSkill;
