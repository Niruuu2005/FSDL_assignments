/**
 * Contact Form Logic (Mock Backend Integration)
 */
const ContactForm = {
    async submit(event) {
        event.preventDefault();
        
        const form = event.target;
        const status = document.getElementById('status');
        const submitBtn = form.querySelector('button');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        status.style.display = 'none';

        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };

        try {
            // Mocking a backend POST request
            // In a real scenario, this would be: fetch('/api/contact', { method: 'POST', ... })
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Simulate success
            status.innerText = 'Message sent! We will get back to you soon.';
            status.className = 'success';
            form.reset();
            
        } catch (error) {
            status.innerText = 'Oops! Something went wrong. Please try again.';
            status.className = 'error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Send Message';
            status.style.display = 'block';
        }
    }
};

// Global scope attachment
window.ContactForm = ContactForm;
