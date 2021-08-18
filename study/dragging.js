const divs = document.querySelectorAll(".draggable-div");

let clickedX = 0;
let clickedY = 0;

// TARIHE BIR NOT MARGINLEFT -4 YUZUNDEN 2:30 SAAT SORUNU COZMEYE CALISIP COZEMEDIM KEKW

onMouseDown = (e) => {
  clickedX = e.clientX;
  clickedY = e.clientY;

  let div;

  if (e.target.className.indexOf("pomodoro") != -1) {
    div = divs[0];
  } else {
    div = divs[1];
  }

  div.setAttribute("data-status", "moving");

  onMouseMove = (e) => {
    if (div.dataset.status !== "stopped") {
      let currentX = e.clientX - clickedX;
      let currentY = e.clientY - clickedY;

      let itemsX = div.getBoundingClientRect().left;
      let itemsY = div.getBoundingClientRect().top;

      clickedX = e.clientX;
      clickedY = e.clientY;

      let newX = itemsX + currentX;
      let newY = itemsY + currentY;

      div.style.left = `${newX}px`;
      div.style.top = `${newY}px`;
    }
  };

  onMouseUp = (e) => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    div.setAttribute("data-status", "stopped");
  };

  div.addEventListener("mousemove", onMouseMove);
  div.addEventListener("mouseup", onMouseUp);
};

divs.forEach((div) => {
  div.addEventListener("mousedown", onMouseDown);
  div.addEventListener("mouseup", () => {});
});

window.addEventListener("mouseup", () => {
  divs.forEach((div) => {
    div.setAttribute("data-status", "stopped");
  });
});
