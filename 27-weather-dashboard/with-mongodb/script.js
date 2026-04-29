/**
 * Weather Dashboard Logic: Line, Bar, and Pie
 */
function initWeatherCharts() {
    // 1. Line Chart: Temperature Forecast
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
            datasets: [{
                label: 'Temp (°C)',
                data: [18, 22, 24, 21, 19, 17],
                borderColor: '#0ea5e9',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 4,
                fill: true,
                backgroundColor: 'rgba(14, 165, 233, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 2. Bar Chart: Precipitation
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Rain (mm)',
                data: [0, 5, 2, 0, 10, 0],
                backgroundColor: '#6366f1',
                borderRadius: 8
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });

    // 3. Pie Chart: Humidity Distribution
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Morning', 'Afternoon', 'Night'],
            datasets: [{
                data: [65, 45, 75],
                backgroundColor: ['#38bdf8', '#fbbf24', '#4f46e5']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// Start logic
document.addEventListener('DOMContentLoaded', initWeatherCharts);
