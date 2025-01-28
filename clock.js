let intervalId;
let elapsedTime = 0; // Elapsed time in seconds
let isTimerMode = true; // true for timer, false for stopwatch
let isRunning = false; // To check if the timer/stopwatch is running
let alarmTimeout; // To store the alarm timeout function

// Get HTML elements
const clockElement = document.getElementById('clock');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const modeToggleBtn = document.getElementById('modeToggleBtn');
const inputContainer = document.getElementById('inputContainer');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const alarmSound = document.getElementById('alarmSound'); // Get audio element
const stopAlarmBtn = document.getElementById('stopAlarmBtn'); // Stop alarm button
const dateTimeElement = document.getElementById('dateTime'); // DateTime display

// Update the clock display
function updateClock() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    
    clockElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to update current date and time
function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    dateTimeElement.textContent = now.toLocaleString('en-US', options); // Format the date and time
}

// Call this function to set the date/time on page load
updateDateTime();

// Update date and time every second
setInterval(updateDateTime, 1000);

// Start timer functionality
function startTimer() {
    if (!isRunning) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;

        // Set elapsedTime based on user input if it's the first start
        if (elapsedTime === 0) {
            elapsedTime = (hours * 3600) + (minutes * 60) + seconds;
        }

        isRunning = true; // Timer is running
        inputContainer.style.display = 'none'; // Hide input fields

        intervalId = setInterval(() => {
            if (elapsedTime > 0) {
                elapsedTime--;
                updateClock();
            } else {
                clearInterval(intervalId);
                isRunning = false; // Timer has completed
                alarmSound.play(); // Play alarm sound
                stopAlarmBtn.style.display = 'block'; // Show stop alarm button
                alarmTimeout = setTimeout(stopAlarm, 20000); // Stop the alarm after 20 seconds
            }
        }, 1000);
    }
}

// Start stopwatch functionality
function startStopwatch() {
    if (!isRunning) {
        inputContainer.style.display = 'none'; // Hide input fields
        isRunning = true; // Stopwatch is running

        intervalId = setInterval(() => {
            elapsedTime++;
            updateClock();
        }, 1000);
    }
}

// Function to stop the timer or stopwatch
function stop() {
    clearInterval(intervalId);
    isRunning = false; // Update running state
    startStopBtn.textContent = 'Start'; // Change button text back to Start
}

// Function to reset the timer or stopwatch
function reset() {
    stop(); // Stop the timer or stopwatch
    elapsedTime = 0; // Reset elapsed time
    updateClock(); // Update display to 00:00:00
    hoursInput.value = '0'; // Reset hours input
    minutesInput.value = '0'; // Reset minutes input
    secondsInput.value = '0'; // Reset seconds input
    inputContainer.style.display = isTimerMode ? 'block' : 'none'; // Show input for timer when in timer mode
    stopAlarmBtn.style.display = 'none'; // Hide stop alarm button
}

// Function to stop the alarm
function stopAlarm() {
    clearTimeout(alarmTimeout); // Clear the timeout
    alarmSound.pause(); // Stop the sound
    alarmSound.currentTime = 0; // Reset sound to the beginning
    stopAlarmBtn.style.display = 'none'; // Hide the stop alarm button
}

// Toggle between timer and stopwatch modes
function toggleMode() {
    stop(); // Stop the current mode (if running)
    elapsedTime = 0; // Reset elapsed time for visual countdown/up
    updateClock(); // Reset clock display

    isTimerMode = !isTimerMode; // Toggle mode
    modeToggleBtn.textContent = isTimerMode ? 'Switch to Stopwatch' : 'Switch to Timer'; // Update button text
    inputContainer.style.display = isTimerMode ? 'block' : 'none'; // Show input for timer or hide for stopwatch
}

// Event listeners for buttons
startStopBtn.addEventListener('click', () => {
    if (startStopBtn.textContent === 'Start') {
        startStopBtn.textContent = 'Stop';
        if (isTimerMode) {
            startTimer();
        } else {
            startStopwatch();
        }
    } else {
        stop();
    }
});

resetBtn.addEventListener('click', reset);
modeToggleBtn.addEventListener('click', toggleMode);
stopAlarmBtn.addEventListener('click', stopAlarm);

// Initialize the clock display
updateClock();
