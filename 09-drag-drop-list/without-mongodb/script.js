/**
 * Drag and Drop Logic
 */
const DraggableList = {
    init() {
        const list = document.getElementById('dragList');
        const items = list.querySelectorAll('.drag-item');

        items.forEach(item => {
            item.addEventListener('dragstart', () => {
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });

        list.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = this.getDragAfterElement(list, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (afterElement == null) {
                list.appendChild(dragging);
            } else {
                list.insertBefore(dragging, afterElement);
            }
        });
    },

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.drag-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => DraggableList.init());
