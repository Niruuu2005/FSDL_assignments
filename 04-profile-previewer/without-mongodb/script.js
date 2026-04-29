/**
 * Updates the profile preview card in real-time
 */
function updatePreview() {
    // Select inputs
    const nameInput = document.getElementById('nameInput');
    const roleInput = document.getElementById('roleInput');
    const bioInput = document.getElementById('bioInput');

    // Select preview elements
    const previewName = document.getElementById('previewName');
    const previewRole = document.getElementById('previewRole');
    const previewBio = document.getElementById('previewBio');

    // Default values
    const defaults = {
        name: "Your Name",
        role: "Job Title",
        bio: "Your professional bio will appear here as you type in the form on the left."
    };

    // Update content
    previewName.innerText = nameInput.value.trim() || defaults.name;
    previewRole.innerText = roleInput.value.trim() || defaults.role;
    previewBio.innerText = bioInput.value.trim() || defaults.bio;
}

// Global scope attachment
window.updatePreview = updatePreview;

// Add event listeners for smoother reactivity
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['nameInput', 'roleInput', 'bioInput'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updatePreview);
    });
});
