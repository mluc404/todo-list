import "./general.css";
import "./sidebar.css";
import "./form.css";
import "./taskDisplay.css";
import { createTask, displayTask, removeTask } from "./createTask.js";

// Create and Display task upon form submission
let form = document.querySelector("form");
let formSubmitButton = document.querySelector("#formSubmitButton");
formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let task = createTask();
  displayTask(task);
  form.reset();
});

// IIFE FUNCTIONS

// Remove the sample task "Go get egss"
let removeSampleTask = (function () {
  let taskList = document.querySelector(".taskList");
  let removeButton = document.querySelector(".taskRemoveButton");
  let taskToRemove = removeButton.parentElement.parentElement;
  let dividerToRemove = taskToRemove.nextElementSibling;
  removeButton.addEventListener("click", () => {
    taskList.removeChild(taskToRemove);
    taskList.removeChild(dividerToRemove);
  });
})();

// Open-Close Form Dialog
let openCloseDialog = (function () {
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
})();

// Toggle page visibility
let togglePage = (function () {
  let todayPage = document.querySelector(".todayPage");
  let todayTabButton = document.querySelector(".todayTabButton");
  let projectPage = document.querySelector(".projectPage");
  let projectTabButton = document.querySelector(".projectTabButton");

  // Clicking a button will turn off the other pages
  projectTabButton.addEventListener("click", () => {
    todayPage.style.display = "none";
    projectPage.style.display = "block";
  });

  todayTabButton.addEventListener("click", () => {
    todayPage.style.display = "block";
    projectPage.style.display = "none";
  });
})();
