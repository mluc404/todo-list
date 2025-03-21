import "./general.css";
import "./sidebar.css";
import "./form.css";
import "./taskDisplay.css";
import { createTask, displayTask, removeTask } from "./createTask.js";
import { format } from "date-fns";

// Form handling
let form = document.querySelector("form");
let todayDate = format(new Date(), "yyyy-MM-dd");
window.onload = (() => {
  document.querySelector("#dueDate").setAttribute("value", todayDate);
})();

// Handle Priority select
let priorityChoice = document.querySelector("#priorityChoice");
priorityChoice.addEventListener("change", (e) => {
  console.log(e.target.value);
  let choice = e.target.value;

  if (choice === "high") priorityChoice.style.backgroundColor = "#e77b50";
  else if (choice === "medium")
    priorityChoice.style.backgroundColor = "#fdc04e";
  else priorityChoice.style.backgroundColor = "#6dbbda";
});

// Create and display tasks upon hitting form submission button
let formSubmitButton = document.querySelector("#formSubmitButton");
let selectPriority = form.querySelector("select");
formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  let task = createTask();
  console.log(task);
  displayTask(task);
  selectPriority.style.backgroundColor = "#e77b50";
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
