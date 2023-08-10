const startPomodoroBtn = document.querySelector(".play-pomodoro-btn");
const pausePomodoroBtn = document.querySelector(".pause-pomodoro-btn");

const pomodoroTimeDiv = document.querySelector(".pomodoro-time-div");
const beepAudio = document.querySelector(".beep-sound");

const pomodoroProgressDiv = document.querySelector(".pomodoro-progress");
const resetPomodoroBtn = document.querySelector(".reset-pomodoro-btn");

AddExtraZero = (x) => {
  return x < 10 ? "0" + x : x;
};

let width = 290;

let pomodoroTime = 25 * 60;
let currentTime = 0;

let makedPomodoros = 0;
let makedPomodoroTime = 0;

let pomodoroMinute = Math.floor(pomodoroTime / 60);
let pomodoroSecond = pomodoroTime % 60;

pomodoroTimeDiv.innerHTML = `<span class="pomodoro-current-time">00:00</span> - ${AddExtraZero(
  pomodoroMinute
)}:${AddExtraZero(pomodoroSecond)}`;

const pomodoroCurrentTimeSpan = document.querySelector(
  ".pomodoro-current-time"
);

pomodoro = () => {
  if (currentTime < pomodoroTime) {
    currentTime++;
    makedPomodoroTime++;

    let percentage = (100 * currentTime) / pomodoroTime;
    let percentageOfWidth = (width * percentage) / 100;

    let currentTimeMinute = Math.floor(currentTime / 60);
    let currentTimeSecond = currentTime % 60;

    pomodoroCurrentTimeSpan.innerHTML = `${AddExtraZero(
      currentTimeMinute
    )}:${AddExtraZero(currentTimeSecond)}`;

    pomodoroProgressDiv.style.width = `${percentageOfWidth}px`;
  }

  if (currentTime == pomodoroTime) {
    startPomodoroBtn.style.display = "flex";
    pausePomodoroBtn.style.display = "none";

    makedPomodoros++;

    beepAudio.play();
  }
};

let pomodoroInterval = setInterval(pomodoro, 1000);
clearInterval(pomodoroInterval);

startPomodoro = () => {
  let pomodoroInterval = setInterval(pomodoro, 1000);

  if (currentTime == pomodoroTime) {
    currentTime = 0;
    clearInterval(pomodoroInterval);
  }

  startPomodoroBtn.style.display = "none";
  pausePomodoroBtn.style.display = "flex";

  pausePomodoroBtn.addEventListener("click", () => {
    clearInterval(pomodoroInterval);

    pausePomodoroBtn.style.display = "none";
    startPomodoroBtn.style.display = "flex";
  });

  resetPomodoroBtn.addEventListener("click", () => {
    clearInterval(pomodoroInterval);
    currentTime = 0;

    pomodoroCurrentTimeSpan.innerHTML = `00:0${currentTime}`;
    pomodoroProgressDiv.style.width = "0";

    pausePomodoroBtn.style.display = "none";
    startPomodoroBtn.style.display = "flex";
  });
};

startPomodoroBtn.addEventListener("click", startPomodoro);

resetPomodoroBtn.addEventListener("click", () => {
  clearInterval(pomodoroInterval);
  currentTime = 0;

  pomodoroCurrentTimeSpan.innerHTML = `00:0${currentTime}`;
  pomodoroProgressDiv.style.width = "0";
});
