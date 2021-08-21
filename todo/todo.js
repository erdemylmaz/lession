const todoListDOM = document.querySelector(".todo-book-container");

let doneButtons = document.querySelectorAll(".todo-check-btn");
let editButtons = document.querySelectorAll(".edit-todo-btn");
let deleteButtons = document.querySelectorAll(".delete-todo-btn");

todoList = [
  {
    title: "TODO 1",
    hasNote: false,
    hasDate: true,
    dateTime: 0,
    hasTime: true,
    date: "18/08/21",
    time: "3:30",
    timeAMPM: "AM",
    hasDone: false,
  },
];

if (localStorage.getItem("todoList")) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
}

initToDos = () => {
  todoList.map((todo, index) => {
    let div = document.createElement("div");
    div.className = `todo ${todo.hasDone ? "todo-done" : ""}`;
    div.setAttribute("data-index", index);

    div.innerHTML = `
	<div class="todo-main">
		<div class="todo-check-btn">
			<div class="todo-check-icon"></div>
		</div>
		<div class="todo-title">${todo.title}</div>
	</div>

	<div class="todo-bottom">
		<div class="todo-note" style="${
      todo.hasNote ? "display: block;" : "display: none;"
    }">${todo.note}</div>

		<div class="todo-bottom-bottom" style="${
      todo.hasDate ? "display: flex;" : "display: none;"
    }">
			<div class="todo-date">${todo.date}</div>
			<div class="todo-time" style="${
        todo.hasTime ? "display: block;" : "display: none;"
      }">${todo.time} ${todo.timeAMPM}</div>
		</div>
	</div>

	<div class="todo-actions">
		<div class="edit-todo-btn"><i class="fas fa-pen"></i></div>
		<div class="delete-todo-btn"><i class="fas fa-trash"></i></div>
	</div>
  `;

    if (!todo.hasDone) {
      todoListDOM.prepend(div);
    } else {
      todoListDOM.appendChild(div);
    }

    doneButtons = document.querySelectorAll(".todo-check-btn");
    editButtons = document.querySelectorAll(".edit-todo-btn");
    deleteButtons = document.querySelectorAll(".delete-todo-btn");

    // delete todo if done time = 30 days
    if (todo.hasDone) {
      let oneSecond = 1000;
      let oneMinute = 60 * oneSecond;
      let oneHour = 60 * oneMinute;
      let oneDay = 24 * oneHour;

      let thirtyDay = 30 * oneDay;

      let currentTime = new Date().getTime();

      if (currentTime - todo.doneTime >= thirtyDay) {
        todoList.splice(index, 1);

        todoListDOM.removeChild(div);
      }
    }

    // is todo out of date
  });
};

initToDos();

deleteToDo = (e) => {
  let todoDiv = e.currentTarget.parentElement.parentElement;
  let todoIndex = todoDiv.dataset.index;

  todoList.splice(todoIndex, 1);

  todoListDOM.removeChild(todoDiv);

  localStorage.setItem("todoList", JSON.stringify(todoList));
};

doneToDo = (e) => {
  let todoDiv = e.currentTarget.parentElement.parentElement;
  let todoIndex = todoDiv.dataset.index;
  let todo = todoList[todoIndex];

  if (!todo.hasDone) {
    let d = new Date();
    let doneTime = d.getTime();

    todo.hasDone = true;
    todo.doneTime = doneTime;
    todoDiv.classList.add("todo-done");

    todoListDOM.removeChild(todoDiv);
    todoListDOM.appendChild(todoDiv);

    localStorage.setItem("todoList", JSON.stringify(todoList));
  }
};

deleteButtons.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", deleteToDo);
});

doneButtons.forEach((doneBtn) => {
  doneBtn.addEventListener("click", doneToDo);
});
