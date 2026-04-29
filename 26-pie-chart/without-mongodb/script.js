/**
 * Pie Chart Logic
 */
function initPieChart() {
    const ctx = document.getElementById('myPie').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [{
                data: [85, 10, 5],
                backgroundColor: [
                    '#10b981', '#ef4444', '#f59e0b'
                ],
                borderWidth: 0,
                hoverOffset: 20
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#94a3b8', padding: 20, font: { size: 14 } }
                },
                tooltip: {
                    backgroundColor: '#000',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 14 }
                }
            },
            cutout: '70%',
            animation: { animateRotate: true, duration: 2000 }
        }
    });
}

// Start logic
document.addEventListener('DOMContentLoaded', initPieChart);
