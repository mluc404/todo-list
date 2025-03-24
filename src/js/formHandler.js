// This module handle the functionality inside the task creation input form

import { createTask, displayTask, removeTaskDisplay } from "./taskHandler.js";
import { format } from "date-fns";

import {
  addTask,
  getAllTasks,
  filterTasksByDueDate,
  filterTasksByPriority,
  getTasksDueToday,
} from "./taskManager.js";

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
    const divToDisplay = document.querySelector(
      ".taskContainer.todoTaskContainer"
    );
    console.log(divToDisplay);
    displayTask(task, divToDisplay);
    console.log(`task initial priority: ${task.priority}`);

    // Testing new functions from taskManager
    // Add the newly created task into taskManager
    addTask(task);
    // let allTasks = getAllTasks();
    // console.table(allTasks);

    // let todayTasks = getTasksDueToday();
    // console.table(todayTasks);

    // let randomDate = "2025-05-25";
    // let arr = filterTasksByDueDate(randomDate);
    // console.table(arr);

    // let arr = filterTasksByPriority("high");
    // console.table(filterTasksByPriority("high"));

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
