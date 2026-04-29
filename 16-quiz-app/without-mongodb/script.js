/**
 * Quiz Application Logic
 */
const Quiz = {
    questions: [
        { q: "Which HTML5 element is used for standalone content like images?", a: ["<aside>", "<figure>", "<section>", "<header>"], c: 1 },
        { q: "What does CSS stand for?", a: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], c: 1 },
        { q: "Which JS method converts a JSON string into an object?", a: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"], c: 1 }
    ],
    currentIdx: 0,
    score: 0,

    loadQuestion() {
        if (this.currentIdx >= this.questions.length) return this.showResults();
        
        const q = this.questions[this.currentIdx];
        document.getElementById('questionText').innerText = q.q;
        document.getElementById('progress').style.width = `${(this.currentIdx / this.questions.length) * 100}%`;
        
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = q.a.map((opt, i) => {
            // Escape HTML tags to display them as text
            const escaped = opt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return `<button class="option" onclick="Quiz.checkAnswer(${i})">${escaped}</button>`;
        }).join('');
    },

    checkAnswer(idx) {
        const q = this.questions[this.currentIdx];
        const buttons = document.querySelectorAll('.option');
        
        if (idx === q.c) {
            buttons[idx].classList.add('correct');
            this.score++;
        } else {
            buttons[idx].classList.add('wrong');
            buttons[q.c].classList.add('correct');
        }

        buttons.forEach(b => b.disabled = true);
        
        setTimeout(() => {
            this.currentIdx++;
            this.loadQuestion();
        }, 1500);
    },

    showResults() {
        const quiz = document.getElementById('quiz');
        quiz.innerHTML = `
            <div class="result-screen">
                <h2>Quiz Completed!</h2>
                <div class="score">${this.score}/${this.questions.length}</div>
                <p>Great effort! You've mastered these concepts.</p>
                <button class="restart-btn" onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
    }
};

// Start logic
document.addEventListener('DOMContentLoaded', () => Quiz.loadQuestion());

// Global scope attachment
window.Quiz = Quiz;
