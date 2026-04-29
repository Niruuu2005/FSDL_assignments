const defaults = {
    name: "Your Name",
    role: "Job Title",
    bio: "Your professional bio will appear here as you type in the form on the left."
};

const nameInput = document.getElementById('nameInput');
const roleInput = document.getElementById('roleInput');
const bioInput = document.getElementById('bioInput');
const previewName = document.getElementById('previewName');
const previewRole = document.getElementById('previewRole');
const previewBio = document.getElementById('previewBio');
const status = document.getElementById('status');

let timer;

function updatePreview() {
    previewName.innerText = nameInput.value.trim() || defaults.name;
    previewRole.innerText = roleInput.value.trim() || defaults.role;
    previewBio.innerText = bioInput.value.trim() || defaults.bio;
}

async function saveProfile() {
    await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: nameInput.value.trim(),
            role: roleInput.value.trim(),
            bio: bioInput.value.trim()
        })
    });

    status.textContent = 'Saved to MongoDB';
}

async function loadProfile() {
    const res = await fetch('/api/profile');
    const profile = await res.json();

    nameInput.value = profile.name || '';
    roleInput.value = profile.role || '';
    bioInput.value = profile.bio || '';
    updatePreview();
}

function handleInput() {
    updatePreview();
    status.textContent = 'Saving...';
    clearTimeout(timer);
    timer = setTimeout(() => saveProfile().catch(() => status.textContent = 'Could not save MongoDB data.'), 300);
}

[nameInput, roleInput, bioInput].forEach((input) => input.addEventListener('input', handleInput));
loadProfile().catch(() => status.textContent = 'Could not load MongoDB data.');
