const video = document.getElementById('background-video');
const playPauseButton = document.getElementById('play-pause-button-1');
const progressBar = document.getElementById('progress-bar-1');
const loopCheckbox = document.getElementById('loop-checkbox-1');
const modal = document.getElementById('warning-modal');
const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');
let linkToOpen = null;

// Unmute the video on the first user interaction
document.addEventListener("click", function() {
    video.muted = false;
    video.play();
}, { once: true });

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = 'Pause';
    } else {
        video.pause();
        playPauseButton.textContent = 'Play';
    }
});

// Update progress bar as the video plays
video.addEventListener('timeupdate', () => {
    progressBar.value = (video.currentTime / video.duration) * 100 || 0;
});

// Seek functionality for the progress bar
progressBar.addEventListener('input', () => {
    video.currentTime = (progressBar.value / 100) * video.duration;
});

// Loop checkbox functionality
loopCheckbox.addEventListener('change', () => {
    video.loop = loopCheckbox.checked;
});

// External link warning modal
document.querySelectorAll('.link-item').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent immediate navigation
        linkToOpen = link.href; // Store the link to open later
        modal.style.display = 'flex'; // Show modal
    });
});

// Confirm button functionality
confirmButton.addEventListener('click', () => {
    if (linkToOpen) {
        window.open(linkToOpen, '_blank'); // Open link
        linkToOpen = null; // Reset the link
    }
    modal.style.display = 'none'; // Hide modal
});

// Cancel button functionality
cancelButton.addEventListener('click', () => {
    linkToOpen = null; // Reset the link
    modal.style.display = 'none'; // Hide modal
});

const carousel = document.querySelector('.carousel');
const boxes = document.querySelectorAll('.box');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let currentIndex = 0;

// Function to show only the current box and hide others
function updateCarousel() {
    boxes.forEach((box, index) => {
        box.style.display = index === currentIndex ? 'block' : 'none';
    });
}

// Left box
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : boxes.length - 1; // Go to previous box or loop back to the last box
    updateCarousel();
});

// Right box
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex < boxes.length - 1) ? currentIndex + 1 : 0; // Go to next box or loop back to the first box
    updateCarousel();
});

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', updateCarousel);




