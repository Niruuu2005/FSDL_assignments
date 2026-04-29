/**
 * Calculator Logic
 */
const Calculator = {
    display: null,
    
    init() {
        this.display = document.getElementById('display');
    },

    append(val) {
        if (this.display.value === '0' || this.display.value === 'Error') {
            this.display.value = val;
        } else {
            this.display.value += val;
        }
    },

    clear() {
        this.display.value = '0';
    },

    calculate() {
        try {
            // Using eval for simplicity in a static practical, 
            // but wrapped in try/catch for basic safety.
            const result = eval(this.display.value);
            this.display.value = Number.isFinite(result) ? result : 'Error';
        } catch {
            this.display.value = 'Error';
        }
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => Calculator.init());

// Global scope attachment
window.Calculator = Calculator;
