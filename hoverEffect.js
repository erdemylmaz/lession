const listItems = document.querySelectorAll(".navbar-section-list-item");
const hoverEffect = document.querySelector(".list-hover");
const activeListItem = document.querySelector(".active-list-item");
const list = document.querySelector(".navbar-section-list");

let activeItemsX = activeListItem.offsetLeft;
let activeItemsY = activeListItem.offsetTop;

hoverEffect.style.width = `${activeListItem.getBoundingClientRect().width}px`;
hoverEffect.style.left = `${activeItemsX}px`;
hoverEffect.style.top = `${activeItemsY}px`;

setTimeout(() => {
  let activeItemsX = activeListItem.offsetLeft;
  let activeItemsY = activeListItem.offsetTop;

  hoverEffect.style.left = `${activeItemsX}px`;
  hoverEffect.style.top = `${activeItemsY}px`;
}, 750);

onHover = (e) => {
  let item = e.target;
  let itemsWidth = item.getBoundingClientRect().width;

  listItems.forEach((item) => {
    if (!item.classList.contains("active-list-item")) {
      item.style.color = "var(--apple-gray)";
    }
  });

  if (!item.classList.contains("active-list-item")) {
    item.style.color = "#000";
  }

  let itemsX = item.offsetLeft;
  let itemsY = item.offsetTop;

  hoverEffect.style.width = `${itemsWidth}px`;
  hoverEffect.style.left = `${itemsX}px`;
  hoverEffect.style.top = `${itemsY}px`;
};

onLeave = () => {
  listItems.forEach((item) => {
    if (!item.classList.contains("active-list-item")) {
      item.style.color = "var(--apple-gray)";
    }
  });

  let activeItemsX = activeListItem.offsetLeft;
  let activeItemsY = activeListItem.offsetTop;

  hoverEffect.style.left = `${activeItemsX}px`;
  hoverEffect.style.top = `${activeItemsY}px`;
};

listItems.forEach((item) => {
  item.addEventListener("mouseenter", onHover);
});

list.addEventListener("mouseleave", onLeave);
