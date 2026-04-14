let timerSeconds = 0;     // how many seconds have elapsed in the current session
let timerInterval = null;  // holds the reference to the repeating interval so we can stop it later

// Start the timer from zero. If one is already running, stop it first.
// setInterval calls the function inside every 1000 milliseconds (1 second).
function startTimer() {
    if (timerInterval) { clearInterval(timerInterval); }
    timerSeconds = 0;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

// Stop the timer and clear the interval so it stops firing.
function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); }
}

// Update the timer display with the elapsed time
function updateTimer() {
    const el = document.getElementById("timerDisplay");
    if (el) el.textContent = formatTime(timerSeconds);
    timerSeconds++;
}

// Convert a number of seconds into a MM:SS display string.
// padStart(2, "0") adds a leading zero if the number is only one digit (e.g. 9 → "09").
function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return m + ":" + s;
}

// Initialize the timer
startTimer();
