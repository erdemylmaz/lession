const confirmNoteBtn = document.querySelector(".confirm-note-btn");
const addNoteModal = document.querySelector(".add-note-modal");
const notesTitleTextarea = document.querySelector(".add-note-title-textarea");
const notesTextTextarea = document.querySelector(".add-note-textarea");
let deleteNoteButtons = document.querySelectorAll(".delete-note-btn");
let changeNoteButtons = document.querySelectorAll(".confirm-change-btn");

const notesArea = document.querySelector(".notes-area");

const addNoteBtn = document.querySelector(".add-note-btn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
// let notes = [];

openNoteModal = () => {
  addNoteModal.style.display = "flex";
};

closeNoteModal = (e) => {
  if (e.target.className == "add-note-modal") {
    addNoteModal.style.display = "none";
  }
};

addNote = () => {
  let title = notesTitleTextarea.value || `Note ${notes.length + 1}`;
  let text = notesTextTextarea.value;

  if (text != "") {
    let div = document.createElement("div");
    div.className = "note";
    div.style.zIndex = `0`;
    div.setAttribute("data-index", notes.length);
    div.style.position = "absolute";

    div.innerHTML = `
		<div class="note-title" title=${title}>${title}</div>
    <div class="delete-note-btn" data-deleteIndex="${notes.length}"><i data-deleteIndex="${notes.length}" class="fas fa-trash"></i></div>
		<textarea class="note-text" title=${text}>${text}</textarea>
		<div class="confirm-change-btn"><i class="fas fa-check"></i></div>
	`;

    notesTextTextarea.value = "";
    notesTitleTextarea.value = "";

    notesArea.appendChild(div);
    addNoteModal.style.display = "none";

    let notesX = div.offsetLeft;
    let notesY = div.offsetTop;

    notes.push({
      title: title,
      text: text,
      id: notes.length + 1,
      index: notes.length,
      x: notesX,
      y: notesY,
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    allNotes = document.querySelectorAll(".note");
    changeNoteButtons = document.querySelectorAll(".confirm-change-btn");

    allNotes.forEach((note) => {
      let notesHeader = note.firstElementChild;
      notesHeader.addEventListener("mousedown", dragNote);
    });

    deleteNoteButtons = document.querySelectorAll(".delete-note-btn");

    deleteNoteButtons.forEach((btn) => {
      btn.addEventListener("click", deleteNote);
    });
  }
};

initNotes = () => {
  notes.map((note, index) => {
    let div = document.createElement("div");
    div.className = "note";
    div.style.zIndex = `0`;
    div.setAttribute("data-index", index);

    div.innerHTML = `
		<div class="note-title" title=${note.title}>${note.title}</div>
    <div class="delete-note-btn" data-deleteIndex="${index}"><i data-deleteIndex="${index}" class="fas fa-trash"></i></div>
		<textarea class="note-text"">${note.text}</textarea>
		<div class="confirm-change-btn"><i class="fas fa-check"></i></div>
	  `;

    notesArea.appendChild(div);

    allNotes = document.querySelectorAll(".note");
    deleteNoteButtons = document.querySelectorAll(".delete-note-btn");
    changeNoteButtons = document.querySelectorAll(".confirm-change-btn");

    allNotes.forEach((note) => {
      let notesHeader = note.firstElementChild;
      notesHeader.addEventListener("mousedown", dragNote);
    });

    div.style.position = "absolute";
    div.style.left = `${note.x}px`;
    div.style.top = `${note.y}px`;
  });
};

deleteNote = (e) => {
  let noteIndex = e.target.dataset.deleteindex;
  let noteDiv = allNotes[noteIndex];

  notes.splice(noteIndex, 1);
  notesArea.removeChild(noteDiv);

  localStorage.setItem("notes", JSON.stringify(notes));

  console.log(notes);
};

changeNote = (e) => {
  let noteDiv = e.currentTarget.parentElement;
  let noteIndex = noteDiv.dataset.index;
  let note = notes[noteIndex];

  let noteTextArea = noteDiv.querySelector(".note-text");
  let newText = noteTextArea.value;

  notes[noteIndex].text = newText;

  localStorage.setItem("notes", JSON.stringify(notes));
};

initNotes();

confirmNoteBtn.addEventListener("click", addNote);
addNoteBtn.addEventListener("click", openNoteModal);
addNoteModal.addEventListener("click", closeNoteModal);

deleteNoteButtons.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", deleteNote);
});

changeNoteButtons.forEach((changeBtn) => {
  changeBtn.addEventListener("click", changeNote);
});
