setInterval(function () {
    document.querySelector("#timeElement").innerHTML =
    new Date().toLocaleString();
}, 1000);


// draggable windows

window.onload = function () {
dragElement(document.getElementById("window"));

dragElement(document.querySelector(".smiski-image"));

dragElement(document.querySelector(".BIG-SMISKI"));

dragElement(document.getElementById("timerApp"));

dragElement(document.getElementById("notesApp"));

loadQuickNote(); //loads saved notes

};


//closing windows
function closeWindow(elementId, event) {
    if (event) {
    event.stopPropagation();
    }

    const element = document.getElementById(elementId);
    if (element) {
    element.style.display = 'none';
    }
}

function dragElement(element) {
    if (!element) return;

    var initialX = 0, initialY = 0;
    var currentX = 0, currentY = 0;

    element.onmousedown = startDragging;

function startDragging(e) {
    e = e || window.event;

    const tagName = e.target.tagName.toLowerCase();
    if (tagName === 'button' || e.target.closest('button') || tagName === 'textarea' || tagName === 'input') {
        return;
    }

    e.preventDefault();

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
}

    function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
    }

}

function selectIcon (element){
    element.classList.add("Selected");
    selectedIcon = element
}

function deselectionIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined
}

const timerContent = [
    {
        title: "Timer App",
        content: `
        <p>SmiskiOS Timer App!</p>
        `
    },
];

function setTimerContent(index){
    const displayArea = document.querySelector("#note-display");
    if (displayArea && timerContent[index]) {
        displayArea.innerHTML - timerContent[index].content;
    }
}

function openWindow(appId){
    const windowEl = document.getElementById(appId);
    if (!windowEl) return;

    if (typeof dragElement === "function") {
    dragElement(windowEl);
    }

    windowEl.style.display = "flex";
    const allWindows = document.querySelectorAll(".window");
    allWindows.forEach(w => w.style.zIndex = "10");
    windowEl.style.zIndex = "20";
}

let timerInterval = null;
let totalSeconds = 25 * 60; // default time
let initialDuration = 25 * 60;
let isRunning = false;

function updateTimerDisplay() {
    const digits = document.querySelector("#countdown-digits");
    if (!digits) return;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMins = String(minutes).padStart(2, "0");
    const formattedSecs = String(seconds).padStart(2, "0");

    digits.textContent = `${formattedMins}:${formattedSecs}`;
}

//timer start
function toggleTimer() {
    const startBtn = document.querySelector("#start-timer-btn");

    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        if (startBtn) startBtn.textContent = "Start";
    } else {
        if (totalSeconds <= 0) return;

        isRunning = true;
        if (startBtn) startBtn.textContent = "Pause";

        timerInterval = setInterval(() => {
            totalSeconds--;
            updateTimerDisplay();

            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                if (startBtn) startBtn.textContent = "Start";
                alert("BEEP!!");
            }
        }, 1000);
    }
}
//timer restart
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    totalSeconds = initialDuration;

    const startBtn = document.querySelector("#start-timer-btn");
    if (startBtn) startBtn.textContent = "Start";

    updateTimerDisplay();
}

function setTimerDuration(minutes) {
    initialDuration = minutes * 60;
    resetTimer();
}



// quicknotes app 

function saveQuickNote() {
    const noteArea = document.getElementById("quickNoteArea");
    if (!noteArea) return;

    const noteContent = noteArea.value;
    localStorage.setItem("smiski_quick_note", noteContent);

    const status = document.getElementById("noteStatus");
    if (status) {
        status.textContent = "quick note saved to files!";
        setTimeout(() => { status.textContent = ""; }, 2000);
    }
}

function loadQuickNote() {
    const savedNote = localStorage.getItem("smiski_quick_note");
    const noteArea = document.getElementById("quickNoteArea");
    if (savedNote && noteArea) {
        noteArea.value = savedNote;
    }
}