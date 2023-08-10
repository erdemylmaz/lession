// Init navbar
AddExtraZero = (x) => {
  return x < 10 ? "0" + x : x;
};

AMPM = (h) => {
  return Math.floor(h / 12) >= 1 ? "PM" : "AM";
};

let dayTime = "";

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

  if (h == 0 && AM_PM == "AM") {
    h = 12;
  }

  let time = [h, m].join(":");
  let date = [day, month, year].join(".");

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

initQuotes = () => {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  navbarQuoteDiv.textContent = `“${randomQuote.quote_english}“`;
  navbarQuoteDiv.title = `${randomQuote.quote_turkish || "Not ready yet."}`;
  navbarQuoteOwnerDiv.textContent = `-${randomQuote.owner}`;
};

setInterval(initNavbar, 1000);

initNoteSection = () => {
  // get notes
  let notes = JSON.parse(localStorage.getItem("notes"));
  let notesArea = document.querySelector(".note-datas");

  let lastNotes = [];

  if (notes.length > 3) {
    lastNotes = [
      notes[notes.length - 1],
      notes[notes.length - 2],
      notes[notes.length - 3],
    ];
  }

  if (notes.length <= 3) {
    lastNotes = notes;
  }

  lastNotes.map((note) => {
    let div = document.createElement("div");
    div.className = "note-data";

    div.innerHTML = `
    <div class="note-data-header">
      <div class="note-data-title">${note.title}</div>
    </div>

    <div class="note-data-note">${note.text}</div>
 
    `;

    notesArea.appendChild(div);
  });
};

// init to do
let todoList = JSON.parse(localStorage.getItem("todoList"));

doneToDo = (e) => {
  let todoArea = document.querySelector(".todo-datas");

  let todoDiv = e.currentTarget.parentElement;
  let todoIndex = todoDiv.dataset.index;
  let todo = todoList[todoIndex];

  todo.hasDone = true;
  todo.doneTime = new Date().getTime();

  e.currentTarget.classList.add("todo-checked");
  todoDiv.classList.add("done-todo");

  todoArea.removeChild(todoDiv);
  todoArea.appendChild(todoDiv);

  localStorage.setItem("todoList", JSON.stringify(todoList));

  setTimeout(() => {
    todoArea.removeChild(todoDiv);
  }, 5000);
};

function initToDoSection() {
  todoList = JSON.parse(localStorage.getItem("todoList")) || [];
  let todoArea = document.querySelector(".todo-datas");

  todoList.map((todo, index) => {
    if (!todo.hasDone) {
      let div = document.createElement("div");
      div.className = "todo-data";
      div.setAttribute("data-index", index);

      div.innerHTML = `
					<div class="todo-checkbox-div">
            <div class="todo-check-icon"></div>
					</div>

					<div class="todo-data-data">
						<div class="todo-data-title">${todo.title}</div>
						<div class="todo-data-date" style="${
              todo.hasDate ? "display: block;" : "display: none;"
            }">${todo.date}</div>
					</div> 
    `;

      todoArea.appendChild(div);
    }
  });

  let doneToDoButtons = document.querySelectorAll(".todo-checkbox-div");

  doneToDoButtons.forEach((doneBtn) => {
    doneBtn.addEventListener("click", doneToDo);
  });

  // checked oldugunda set timeout display none;
}

// init goals
function animateNumberDiv(div, maxNumber, icon) {
  let number = 0;
  setInterval(() => {
    if (number < maxNumber) {
      number++;
      div.textContent = number + `${icon || ""}`;
    } else {
      clearInterval(this);
    }
  }, 1000 / 60);
}

initGoals = () => {
  let goalsList = JSON.parse(localStorage.getItem("goalsList"));
  let goalsArea = document.querySelector(".daily-datas");

  goalsList.map((goal) => {
    if (goal.type == "daily") {
      let div = document.createElement("div");
      div.className = "section-data";

      div.innerHTML = `
      <div class="section-data-title">${goal.title}</div>

					<div class="data-percentage">${goal.percentage}%</div>
					<div class="section-data-progress-div">
						<div class="section-data-progress"></div>
					</div> 
    `;

      goalsArea.appendChild(div);

      let progressDiv = div.querySelector(".section-data-progress-div");
      let progressDOM = div.querySelector(".section-data-progress");
      let progressDivsWidth = progressDiv.offsetWidth;

      let percentageDiv = div.querySelector(".data-percentage");

      let percentageOfWidth = (goal.percentage * progressDivsWidth) / 100;

      let width = 0;

      animateNumberDiv(percentageDiv, goal.percentage, "%");

      setInterval(() => {
        if (width <= percentageOfWidth) {
          width++;
          progressDOM.style.width = `${width}px`;
        }
      }, 1000 / 60);
    }
  });
};

function init() {
  initNavbar();
  initQuotes();
  initGoals();
  initToDoSection();
  initNoteSection();

  let mode = localStorage.getItem("mode");

  if (dayTime == "Night") {
    mode = "dark";
  }

  if (mode == "dark") {
    document.body.classList.add("dark");
  }
}

init();
