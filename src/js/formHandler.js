// This module handle the functionality inside the task creation input form

import { createTask, displayTask, removeTask } from "./taskHandler.js";
import { format } from "date-fns";

import { addTask, getAllTasks } from "./taskManager.js";

// Initialize form
const initForm = () => {
  let form = document.querySelector("form");
  let todayDate = format(new Date(), "yyyy-MM-dd");
  // Set default current date in due date calender
  document.querySelector("#dueDate").setAttribute("value", todayDate);

  // Handle task priority selection
  let priorityChoice = document.querySelector("#priorityChoice");
  priorityChoice.addEventListener("change", (e) => {
    console.log("<select> obj", e.target.selectedOptions);
    console.log(e.target.value);
    let choice = e.target.value;
    if (choice === "high") priorityChoice.style.backgroundColor = "#e77b50";
    else if (choice === "medium")
      priorityChoice.style.backgroundColor = "#fdc04e";
    else if (choice === "low") priorityChoice.style.backgroundColor = "#6dbbda";
    else priorityChoice.style.backgroundColor = "var(--dialog-bg-color, white)";
  });

  // Handle form submission
  let formSubmitButton = document.querySelector("#formSubmitButton");
  let selectPriority = form.querySelector("select");
  formSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let task = createTask();
    displayTask(task);
    console.log(`task initial priority: ${task.priority}`);
    // Testing add task to storage
    addTask(task);
    let allTasks = getAllTasks();
    console.log(allTasks[0]);
    console.table(allTasks[0]);
    selectPriority.style.backgroundColor = "var(--dialog-bg-color, white)"; // reset to default None
    form.reset();
  });

  // Open/close form dialog
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
};

export { initForm };
