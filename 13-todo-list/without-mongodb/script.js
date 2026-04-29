/**
 * Todo Application logic
 */
const TodoApp = {
    todos: JSON.parse(localStorage.getItem('fsdl-todos')) || [],

    add() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        if (text) {
            this.todos.push({ id: Date.now(), text, done: false });
            input.value = '';
            this.save();
        }
    },

    toggle(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            this.save();
        }
    },

    remove(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
    },

    save() {
        localStorage.setItem('fsdl-todos', JSON.stringify(this.todos));
        this.render();
    },

    render() {
        const list = document.getElementById('todoList');
        list.innerHTML = this.todos.map(t => `
            <li class="todo-item ${t.done ? 'done' : ''}">
                <div style="display: flex; align-items: center; gap: 12px; cursor: pointer" onclick="TodoApp.toggle(${t.id})">
                    <input type="checkbox" ${t.done ? 'checked' : ''} style="width: auto">
                    <span>${t.text}</span>
                </div>
                <button class="delete-btn" onclick="TodoApp.remove(${t.id})">🗑️</button>
            </li>
        `).join('');
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => TodoApp.render());

// Global scope attachment
window.TodoApp = TodoApp;
