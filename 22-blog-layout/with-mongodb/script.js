/**
 * Blog interactions: Reading progress
 */
function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const bar = document.getElementById("bar");
    if (bar) bar.style.width = scrolled + "%";
}

window.addEventListener('scroll', updateProgressBar);
