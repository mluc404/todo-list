import "./styles.css";
import "./sidebar.css";
import "./mainSection.css";
import { createTask, displayTask } from "./createTask.js";

// Create and Display task upon form submission
let formSubmitButton = document.querySelector("#formSubmitButton");
formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let task = createTask();
  displayTask(task);
});

// Function to remove the default task "Go get egss"
let removeTaskPlaceHolder = (function () {
  let taskList = document.querySelector(".taskList");
  let removeButton = document.querySelector(".taskRemoveButton");
  let taskToRemove = removeButton.parentElement.parentElement;
  let dividerToRemove = taskToRemove.nextElementSibling;
  removeButton.addEventListener("click", () => {
    taskList.removeChild(taskToRemove);
    taskList.removeChild(dividerToRemove);
  });
})();

// Open-Close Dialog
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
