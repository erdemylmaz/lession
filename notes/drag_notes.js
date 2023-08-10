let allNotes = document.querySelectorAll(".note");

let pos1 = 0;
let pos2 = 0;
let pos3 = 0;
let pos4 = 0;

dragNote = (e) => {
  let item = e.target.parentElement;
  let noteIndex = item.dataset.index;

  let note = notes[noteIndex];

  item.style.zIndex = "3";

  let itemsX = item.offsetLeft;
  let itemsY = item.offsetTop;

  item.style.position = "absolute";
  item.style.left = `${itemsX}px`;
  item.style.top = `${itemsY}px`;

  pos3 = e.clientX;
  pos4 = e.clientY;

  item.setAttribute("data-status", "dragging");

  onMouseMove = (e) => {
    if (item.dataset.status != "stopped") {
      pos1 = e.clientX - pos3;
      pos2 = e.clientY - pos4;
      pos3 = e.clientX;
      pos4 = e.clientY;

      let itemsX = item.offsetLeft;
      let itemsY = item.offsetTop;

      item.style.left = `${itemsX + pos1}px`;
      item.style.top = `${itemsY + pos2}px`;
    }
  };

  onMouseUp = () => {
    item.setAttribute("data-status", "stopped");

    note.x = item.offsetLeft;
    note.y = item.offsetTop;

    localStorage.setItem("notes", JSON.stringify(notes));

    item.style.zIndex = "2";
  };

  window.addEventListener("mouseup", onMouseUp);
  item.addEventListener("mouseup", onMouseUp);
  item.addEventListener("mousemove", onMouseMove);
};

allNotes.forEach((note) => {
  let notesHeader = note.firstElementChild;
  notesHeader.addEventListener("mousedown", dragNote);
});
