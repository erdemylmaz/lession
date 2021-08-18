const confirmNoteBtn = document.querySelector(".confirm-note-btn");
const addNoteModal = document.querySelector(".add-note-modal");
const notesTitleTextarea = document.querySelector(".add-note-title-textarea");
const notesTextTextarea = document.querySelector(".add-note-textarea");

const notesArea = document.querySelector(".notes-area");

const addNoteBtn = document.querySelector(".add-note-btn");

let notes = [];

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

    div.innerHTML = `
		<div class="note-title" title=${title}>${title}</div>
		<textarea class="note-text" title=${text}>${text}</textarea>
		<div class="confirm-change-btn"><i class="fas fa-check"></i></div>
	`;

    notes.push({
      title: title,
      text: text,
      id: notes.length + 1,
      index: notes.length,
    });

    notesTextTextarea.value = "";
    notesTitleTextarea.value = "";

    notesArea.appendChild(div);
    addNoteModal.style.display = "none";

    allNotes = document.querySelectorAll(".note");

    allNotes.forEach((note) => {
      let notesHeader = note.firstElementChild;
      notesHeader.addEventListener("mousedown", dragNote);
    });
  }
};

confirmNoteBtn.addEventListener("click", addNote);

addNoteBtn.addEventListener("click", openNoteModal);
addNoteModal.addEventListener("click", closeNoteModal);
