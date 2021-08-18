const musicDurationSpan = document.querySelector(".musics-duration");
const musicsCurrentTimeSpan = document.querySelector(".musics-current-time");

const musicsTitleDiv = document.querySelector(".musics-name");

const audio = document.querySelector(".music-player-audio");

const loopBtn = document.querySelector(".loop-music-btn");
const previousMusicBtn = document.querySelector(".previous-music-btn");
const nextMusicBtn = document.querySelector(".next-music-btn");
const playMusicBtn = document.querySelector(".play-music-btn");
const pauseMusicBtn = document.querySelector(".pause-music-btn");

const musicProgressDiv = document.querySelector(".musics-time-bar");
const musicProgress = document.querySelector(".music-time-progress");
const musicProgressHover = document.querySelector(".music-progress-hover");

AddExtraZero = (x) => {
  return x < 10 ? "0" + x : x;
};

let musicIndex = Math.floor(Math.random() * musics.length);
let isLooped = false;

musicsTitleDiv.textContent = `${musics[musicIndex].title}`;

let musicDurationMinute = Math.floor(musics[musicIndex].duration / 60);
let musicDurationSecond = Math.floor(musics[musicIndex].duration % 60);

musicDurationSpan.textContent = `${AddExtraZero(
  musicDurationMinute
)}:${AddExtraZero(musicDurationSecond)}`;

let musicProgressDivsWidth = musicProgressDiv.getBoundingClientRect().width;

updateMusic = () => {
  if (audio.dataset.status == "playing") {
    let currentTime = audio.currentTime;

    let percentage = (currentTime * 100) / audio.duration;
    let percentageOfWidth = (musicProgressDivsWidth * percentage) / 100;

    let currentTimeMinute = Math.floor(currentTime / 60);
    let currentTimeSecond = Math.floor(currentTime % 60);

    musicProgress.style.width = `${percentageOfWidth}px`;
    musicsCurrentTimeSpan.textContent = `${AddExtraZero(
      currentTimeMinute
    )}:${AddExtraZero(currentTimeSecond)}`;
  }
};

setInterval(updateMusic, 1000 / 60);

playMusic = () => {
  let music = musics[musicIndex];

  musicsTitleDiv.textContent = `${music.title}`;

  playMusicBtn.style.display = "none";
  pauseMusicBtn.style.display = "flex";

  if (audio.dataset.isfirsttime != "false") {
    audio.src = `../musics/${music.link}`;
  }
  audio.play();

  audio.setAttribute("data-status", "playing");

  let musicDurationMinute = Math.floor(music.duration / 60);
  let musicDurationSecond = Math.floor(music.duration % 60);

  musicDurationSpan.textContent = `${AddExtraZero(
    musicDurationMinute
  )}:${AddExtraZero(musicDurationSecond)}`;
};

pauseMusic = () => {
  audio.pause();

  audio.setAttribute("data-isFirstTime", "false");
  playMusicBtn.style.display = "flex";
  pauseMusicBtn.style.display = "none";
};

nextMusic = () => {
  audio.setAttribute("data-isFirstTime", "true");
};

loop = () => {
  if (!loopBtn.classList.contains("loop-active")) {
    isLooped = true;
    audio.loop = true;
    loopBtn.classList.add("loop-active");
  } else {
    isLooped = false;
    audio.loop = false;
    loopBtn.classList.remove("loop-active");
  }
};

changeCurrentTime = (e) => {
  let clickedX = e.offsetX;
  let percentage = (100 * clickedX) / musicProgressDivsWidth;
  let percentageOfDuration = (audio.duration * percentage) / 100;

  audio.currentTime = percentageOfDuration;
};
onHover = (e) => {
  let width = e.offsetX;
  musicProgressHover.style.display = `flex`;
  musicProgressHover.style.opacity = "0.5";
  musicProgressHover.style.width = `${width}px`;
};

playMusicBtn.addEventListener("click", playMusic);
pauseMusicBtn.addEventListener("click", pauseMusic);

loopBtn.addEventListener("click", loop);

musicProgressDiv.addEventListener("click", changeCurrentTime);
musicProgressDiv.addEventListener("mousemove", onHover);
musicProgressDiv.addEventListener("mouseleave", () => {
  musicProgressHover.style.display = "none";
});

const musicVolumeDiv = document.querySelector(".music-volume-div");
const musicVolumeBar = document.querySelector(".music-volume-bar");
const musicVolumeIcon = musicVolumeDiv.querySelector("i");

musicVolumeDiv.addEventListener("mouseenter", () => {
  musicVolumeBar.style.display = "flex";
  musicVolumeDiv.style.color = "#fff";
});

musicVolumeBar.addEventListener("mouseleave", () => {
  musicVolumeBar.style.display = "none";
  musicVolumeDiv.style.color = "var(--apple-pink)";
});

musicVolumeIcon.addEventListener("click", () => {
  if (audio.volume != 0) {
    audio.setAttribute("data-lastvolumelevel", `${audio.volume}`);

    audio.volume = 0;
    musicVolumeIcon.className = "fas fa-volume-mute";

    musicVolumeBar.value = 0;
  } else {
    audio.volume = audio.dataset.lastvolumelevel;
    musicVolumeBar.value = audio.volume * 100;

    if (audio.volume < 0.65 && audio.volume > 0) {
      musicVolumeIcon.className = "fas fa-volume-down";
    }

    if (audio.volume >= 0.65) {
      musicVolumeIcon.className = "fas fa-volume-up";
    }
  }
});

musicVolumeBar.addEventListener("mousemove", () => {
  let value = musicVolumeBar.value / 100;

  if (value == 0) {
    musicVolumeIcon.className = "fas fa-volume-mute";
  }

  if (value < 0.65 && value > 0) {
    musicVolumeIcon.className = "fas fa-volume-down";
  }

  if (value >= 0.65) {
    musicVolumeIcon.className = "fas fa-volume-up";
  }

  audio.volume = value;
});
