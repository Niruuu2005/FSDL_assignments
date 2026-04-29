/**
 * Multi-step Form Logic
 */
const MultiStepForm = {
    currentStep: 1,

    init() {
        this.showStep(1);
    },

    nextStep(step) {
        if (step === 3) {
            this.prepareReview();
        }
        this.showStep(step);
    },

    showStep(step) {
        this.currentStep = step;
        
        // Update Steps Visibility
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step${step}`).classList.add('active');
        
        // Update Progress Dots
        document.querySelectorAll('.dot').forEach((d, idx) => {
            d.classList.toggle('active', (idx + 1) <= step);
        });
    },

    prepareReview() {
        const name = document.getElementById('name').value || "Not provided";
        const email = document.getElementById('email').value || "Not provided";
        
        document.getElementById('reviewName').innerText = name;
        document.getElementById('reviewEmail').innerText = email;
    },

    submit() {
        alert('Form submitted successfully! 🚀');
        // Reset form
        location.reload();
    }
};

// Global scope attachment
window.MultiStepForm = MultiStepForm;
