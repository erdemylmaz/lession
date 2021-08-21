let goalsList = [
  {
    title: "Soru Coz",
    progressType: "number",
    type: "daily",
    goal: 100,
    currentProgress: 59,
    percentage: 59,
  },
  {
    title: "Soru Coz",
    progressType: "number",
    type: "main",
    goal: 200,
    currentProgress: 123,
    percentage: 70,
  },
  {
    title: "Soru Coz",
    progressType: "number",
    type: "daily",
    goal: 324,
    currentProgress: 123,
    percentage: 32,
  },
];

function toUpperCase(text) {
  text = text[0].toUpperCase() + text.slice(1).toLowerCase();
  return text;
}

function animateNumberDiv(div, maxNumber, icon) {
  let number = 0;
  setInterval(() => {
    if (number < maxNumber) {
      number++;
      div.textContent = number + `${icon || ""}`;
    } else {
      clearInterval(this);
    }
  }, 1);
}

const goalsArea = document.querySelector(".goals");

initGoals = () => {
  goalsList.map((goal, index) => {
    let div = document.createElement("div");
    div.className = "goal";

    let typeText = "";

    if (goal.progressType == "time") {
      typeText = ``;
    }

    div.innerHTML = `
		
	<div class="goal-header">
		<div class="goal-title">${goal.title}</div>
		<div class="goal-add-data-btn" title="Add data" data-index=${index}>+</div>
	</div>

	<div class="goal-container">
		<div class="goal-percentage">${goal.percentage}%</div>
		<div class="goal-main-progress-div">
			<div class="goal-current-progress">${goal.currentProgress}</div>

			<div class="goal-progress-div">
				<div class="goal-progress"></div>
			</div>

			<div class="goal-total-progress">${goal.goal}</div>
		</div>
	</div>

	<div class="goal-footer">
		<div class="goal-type">${toUpperCase(goal.type)}</div>
	</div>	
	`;

    goalsArea.appendChild(div);

    let progressDiv = div.querySelector(".goal-progress-div");
    let progressDOM = div.querySelector(".goal-progress");
    let progressDivsWidth = progressDiv.offsetWidth;

    let percentageDOM = div.querySelector(".goal-percentage");
    let goalTotalProgressDOM = div.querySelector(".goal-total-progress");
    let goalCurrentProgressDOM = div.querySelector(".goal-current-progress");

    let percentageOfWidth = (goal.percentage * progressDivsWidth) / 100;

    let width = 0;

    setInterval(() => {
      if (width <= percentageOfWidth) {
        width++;
        progressDOM.style.width = `${width}px`;
      } else {
        clearInterval(this);
      }
    }, 1);

    animateNumberDiv(percentageDOM, goal.percentage, "%");
    animateNumberDiv(goalTotalProgressDOM, goal.goal);
    animateNumberDiv(goalCurrentProgressDOM, goal.currentProgress);
  });

  localStorage.setItem("goalsList", JSON.stringify(goalsList));
};

initGoals();
