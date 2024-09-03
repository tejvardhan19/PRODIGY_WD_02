// script.js
let startTime, updateTime;
let elapsedTime = 0;
let isRunning = false;
let laps = [];
let intervalId;

const display = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor(ms / (1000 * 60 * 60));

    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00.00";
    laps = [];
    lapsContainer.innerHTML = '';
}

function addLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.innerHTML = `Lap ${laps.length}: <span>${lapTime}</span>`;
        lapsContainer.appendChild(lapElement);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);
