/**
 * Notes Application Logic
 */
const Notes = {
    data: JSON.parse(localStorage.getItem('zen-notes')) || [
        { id: 1, title: "Ideas for Project", body: "Focus on glassmorphism and clean typography." }
    ],

    save() {
        localStorage.setItem('zen-notes', JSON.stringify(this.data));
        this.render();
    },

    add() {
        this.data.unshift({ id: Date.now(), title: "", body: "" });
        this.save();
    },

    update(id, field, value) {
        const note = this.data.find(n => n.id === id);
        if (note) {
            note[field] = value;
            // Silent save (no re-render to avoid losing cursor focus)
            localStorage.setItem('zen-notes', JSON.stringify(this.data));
        }
    },

    remove(id) {
        this.data = this.data.filter(n => n.id !== id);
        this.save();
    },

    render() {
        const grid = document.getElementById('grid');
        grid.innerHTML = this.data.map(n => `
            <div class="note">
                <input class="note-title" placeholder="Title" value="${n.title}" oninput="Notes.update(${n.id}, 'title', this.value)">
                <textarea class="note-body" placeholder="Start typing..." oninput="Notes.update(${n.id}, 'body', this.value)">${n.body}</textarea>
                <div class="actions">
                    <button class="action-btn" onclick="Notes.remove(${n.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => Notes.render());

// Global scope attachment
window.Notes = Notes;
