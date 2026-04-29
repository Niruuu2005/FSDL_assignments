/**
 * Sales Dashboard Logic
 */
function initSalesCharts() {
    // 1. Line Chart: Revenue Growth
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue ($)',
                data: [4500, 5200, 4800, 6100, 5900, 7200],
                borderColor: '#10b981',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(16, 185, 129, 0.1)'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 2. Bar Chart: Category Sales
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'bar',
        data: {
            labels: ['Tech', 'Fashion', 'Home', 'Beauty'],
            datasets: [{
                label: 'Units Sold',
                data: [320, 210, 150, 280],
                backgroundColor: '#6366f1'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // 3. Pie Chart: Region Distribution
    const regionCtx = document.getElementById('regionChart').getContext('2d');
    new Chart(regionCtx, {
        type: 'doughnut',
        data: {
            labels: ['North', 'South', 'East', 'West'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: ['#f43f5e', '#fbbf24', '#22c55e', '#3b82f6']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '60%' }
    });
}

// Start logic
document.addEventListener('DOMContentLoaded', initSalesCharts);
