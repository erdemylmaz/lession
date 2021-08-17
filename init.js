// Init navbar
AddExtraZero = (x) => {
  return x < 10 ? "0" + x : x;
};

AMPM = (h) => {
  return Math.floor(h / 12) >= 1 ? "PM" : "AM";
};

initNavbar = () => {
  let d = new Date();

  let h = AddExtraZero(d.getHours());
  let m = AddExtraZero(d.getMinutes());

  let day = AddExtraZero(d.getDate());
  let month = AddExtraZero(d.getMonth());
  let year = AddExtraZero(d.getFullYear());

  let AM_PM = AMPM(h);

  if (h == 12) {
    h = 12;
  } else {
    if (h - 12 >= 0) {
      h = h - 12;
    }
  }

  let time = [h, m].join(":");
  let date = [day, month, year].join(".");

  let dayTime = "";

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

  navbarTime.innerHTML = `
	<div class="time-div">${time} ${AM_PM}</div>
	<div class="date-div">${date}</div>
  `;

  if (dayTime == "Morning") {
    navbarHeaderDailyText.style.color = "var(--apple-yellow)";
  }

  if (dayTime == "Afternoon") {
    navbarHeaderDailyText.style.color = "var(--apple-orange)";
  }

  if (dayTime == "Evening") {
    navbarHeaderDailyText.style.color = "var(--apple-gray)";
  }

  if (dayTime == "Night") {
    navbarHeaderDailyText.style.color = "var(--apple-dark-mode-blue)";
  }

  navbarHeaderDailyText.textContent = `Good ${dayTime}!`;
};

setInterval(initNavbar, 1000);

function init() {
  initNavbar();
}

init();
