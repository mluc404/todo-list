import "./styles.css";
import "./sidebar.css";
import "./mainSection.css";
import createTask from "./createTask.js";

let formSubmitButton = document.querySelector("#formSubmitButton");
formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  let task = createTask();
  console.log(task);

  handleDOM(task);
});

let handleDOM = function (task) {
  let taskContainer = document.querySelector(".classContainer");
  let taskList = document.querySelector(".taskList");

  taskList.innerHTML += `<li>
  <span class='aTask'>
  <input type='checkbox' class='checkbox'><span>${task.taskName}</span>
  </span>
  <p>${task.taskDescription}</p>
  </li>
  <div class='divider'></div>`;
};

let addTaskButton = document.querySelector(".addTaskButton");
let closeFormButton = document.querySelector(".closeFormButton");
let dialog = document.querySelector("dialog");
addTaskButton.addEventListener("click", () => {
  dialog.showModal();
});

closeFormButton.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

// show pages on off
let todayPage = document.querySelector(".todayPage");
let projectPage = document.querySelector(".projectPage");
let todayTabButton = document.querySelector(".todayTabButton");
let projectTabButton = document.querySelector(".projectTabButton");

projectTabButton.addEventListener("click", () => {
  todayPage.style.display = "none";
  projectPage.style.display = "block";
});

todayTabButton.addEventListener("click", () => {
  todayPage.style.display = "block";
  projectPage.style.display = "none";
});
