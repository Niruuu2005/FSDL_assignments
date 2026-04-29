/**
 * Event Registration Logic
 */
const Registration = {
    async submit(event) {
        event.preventDefault();
        const btn = event.target.querySelector('button');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerText = 'Registering...';

        try {
            // Mock API delay
            await new Promise(r => setTimeout(r, 1200));
            
            this.notify("Registration Successful! See you at the summit.");
            event.target.reset();
        } catch (e) {
            alert("Something went wrong. Please try again.");
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    },

    notify(msg) {
        const n = document.getElementById('notification');
        n.innerText = msg;
        n.classList.add('show');
        setTimeout(() => n.classList.remove('show'), 4000);
    }
};

// Global scope attachment
window.Registration = Registration;
