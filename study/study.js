const backgroundDiv = document.querySelector(".background-img-div");

let dayTime = "";

AMPM = (h) => {
  return Math.floor(h / 12) >= 1 ? "PM" : "AM";
};

let d = new Date();

let h = d.getHours();

let AM_PM = AMPM(h);

if (h == 12) {
  h = 12;
} else {
  if (h - 12 >= 0) {
    h = h - 12;
  }
}

if (h >= 1 && AM_PM == "PM") {
  dayTime = "Afternoon";
}

if (h >= 5 && h < 12 && AM_PM == "AM") {
  dayTime = "Morning";
}

if (h >= 6 && AM_PM == "PM") {
  dayTime = "Evening";
}

if (h >= 10 && AM_PM == "PM") {
  dayTime = "Night";
}

if (h < 5 && AM_PM == "AM") {
  dayTime = "Night";
}

if (h == 12 && AM_PM == "PM") {
  dayTime = "Afternoon";
}

if (h == 12 && AM_PM == "AM") {
  dayTime = "Night";
}

let dayTimeWallpapers = wallpapers.filter(
  (wallpaper) =>
    wallpaper.time == dayTime.toLowerCase() && wallpaper.type == "horizontal"
);

if (dayTime == "Afternoon") {
  dayTimeWallpapers = wallpapers.filter(
    (wallpaper) => wallpaper.time == "morning"
  );
}

const randomBG =
  dayTimeWallpapers[Math.floor(Math.random() * dayTimeWallpapers.length)];

backgroundDiv.innerHTML = `<img src="../images/${randomBG.link}.jpg" class="background-image">`;

const navbar = document.querySelector(".study-navbar");

let navbarsWidth = navbar.getBoundingClientRect().width;

const showMucisBtn = document.querySelector(".show-musics-btn");
const musicsList = document.querySelector(".musics-list");

showMucisBtn.addEventListener("click", () => {
  if (!musicsList.classList.contains("musics-active")) {
    showMucisBtn.textContent = "Hide Musics";

    musicsList.style.display = "flex";
    musicsList.classList.add("musics-active");
  } else {
    showMucisBtn.textContent = "Show Musics";

    musicsList.style.display = "none";
    musicsList.classList.remove("musics-active");
  }
});

musics.map((music) => {
  let div = document.createElement("div");
  div.className = "music-list-item";
  div.setAttribute("data-title", `${music.title}`);

  div.innerHTML = `
    <div class="list-item-play-music-btn"><i class="fas fa-play"></i></div>
    <div class="list-item-musics-name">${music.title}</div> 
  `;

  musicsList.appendChild(div);

  musicListItems = document.querySelectorAll(".music-list-item");

  musicListItems.forEach((item) => {
    item.addEventListener("click", () => {
      let musicIndex;
      musics.map((msc, index) => {
        if (msc.title == item.dataset.title) {
          musicIndex = index;
        }
      });

      // musicsList.style.display = "none";

      playMusic(musicIndex);

      let icon = item.querySelector("i");
      icon.className = "fas fa-pause";
    });
  });
});

const quoteDiv = document.querySelector(".quote");
const quoteOwnerDiv = document.querySelector(".quote-owner");

let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

quoteDiv.title = randomQuote.quote_turkish || "Not ready yet.";
quoteDiv.textContent = `“${randomQuote.quote_english}“`;
quoteOwnerDiv.textContent = `-${randomQuote.owner}`;
