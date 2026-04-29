/**
 * Stopwatch Logic
 */
const Stopwatch = {
    ms: 0,
    interval: null,

    start() {
        if (this.interval) return;
        
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'block';
        
        this.interval = setInterval(() => {
            this.ms += 10;
            this.updateDisplay();
        }, 10);
    },

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'none';
    },

    reset() {
        this.stop();
        this.ms = 0;
        this.updateDisplay();
    },

    updateDisplay() {
        const date = new Date(this.ms);
        const m = String(date.getUTCMinutes()).padStart(2, '0');
        const s = String(date.getUTCSeconds()).padStart(2, '0');
        const ms = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
        
        document.getElementById('display').innerText = `${m}:${s}:${ms}`;
    }
};

// Global scope attachment
window.Stopwatch = Stopwatch;
