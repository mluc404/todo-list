// This module handles task creation, display, and removal

import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
  removeTask,
  saveTasks,
  getAllTasks,
  getAllProjects,
  saveProjects,
  updateTasksInProject,
  reRenderProjectTasks,
} from "./taskManager";

import { displayProject } from "./projectHandler";

// Function to get form inputs to create a task object
let createTask = function () {
  let taskName = document.querySelector("#taskName").value.trim();
  let taskDescription = document.querySelector("#taskDescription").value.trim();

  let dueDate = document.querySelector("#dueDate").value;
  let priority = document.querySelector("#priorityChoice").value;

  let checked = false;
  let project = document.querySelector("#projectChoice").value;

  return { taskName, taskDescription, dueDate, priority, checked, project };
};

// Utility function to format and set the due date display
let setDueDate = (task, dueDateDisplay) => {
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the user's local time zone
  let zonedDate = toZonedTime(task.dueDate, timeZone); // Convert the date into user time zone
  let formattedDate = format(zonedDate, "EEEE, MMM dd"); // May add 'yyyy' if needed

  if (isToday(zonedDate)) dueDateDisplay.textContent = "Today";
  else if (isTomorrow(zonedDate)) dueDateDisplay.textContent = "Tomorrow";
  else if (isYesterday(zonedDate)) dueDateDisplay.textContent = "Yesterday";
  else {
    dueDateDisplay.textContent = `${formattedDate}`;
  }
};

// Utility function to create a date picker for a task
const createDatePicker = (task) => {
  let calendarButton = document.createElement("input");
  calendarButton.setAttribute("type", "date");
  calendarButton.className = "calendarButton";
  calendarButton.setAttribute("value", task.dueDate);
  calendarButton.setAttribute("aria-label", "Change due date");

  calendarButton.addEventListener("change", (e) => {
    task.dueDate = e.target.value;

    // NOTE: IN THE FUTURE, THIS SHOULD UPDATE A CENTRAL TASK MANAGER
    // AND TRIGGER A RE-RENDER OF THE TASK LIST
    // saveTasks();
    updateTasksInProject(task);
    // saveProjects();
  });
  return calendarButton;
};

// Utility function to create flag display
const createFlag = (task) => {
  let option0 = document.createElement("option");
  option0.className = "noPriority";
  let option1 = document.createElement("option");
  option1.className = "highPriority";
  let option2 = document.createElement("option");
  option2.className = "medPriority";
  let option3 = document.createElement("option");
  option3.className = "lowPriority";

  option0.innerHTML = "&#127987;";
  option1.innerHTML = "&#127987;";
  option2.innerHTML = "&#127987;";
  option3.innerHTML = "&#127987;";

  let flagSelection = document.createElement("select");
  flagSelection.className = "flagSelection";
  flagSelection.setAttribute("aria-label", "Change task priority");

  flagSelection.append(option1, option2, option3, option0);

  // Set default flag based on user's intial priority choice
  if (task.priority === "high") {
    option1.selected = true;
    flagSelection.style.backgroundColor = "var(--high-priority-color)";
  } else if (task.priority === "medium") {
    option2.selected = true;
    flagSelection.style.backgroundColor = "var(--med-priority-color)";
  } else if (task.priority === "low") {
    option3.selected = true;
    flagSelection.style.backgroundColor = "var(--low-priority-color)";
  } else {
    option0.selected = true;
    flagSelection.style.backgroundColor = "var(--no-priority-color)";
  }
  return flagSelection;
};

// Utility function to update Flag and task.priority
const updateFlag = (task, flagSelection) => {
  flagSelection.addEventListener("change", (e) => {
    console.log("<select> obj", e.target.selectedOptions);
    let choice = e.target.selectedOptions[0].className;

    if (choice === "highPriority") {
      flagSelection.style.backgroundColor = "var(--high-priority-color)";
      task.priority = "high";
    } else if (choice === "medPriority") {
      flagSelection.style.backgroundColor = "var(--med-priority-color)";
      task.priority = "medium";
    } else if (choice === "lowPriority") {
      flagSelection.style.backgroundColor = "var(--low-priority-color)";
      task.priority = "low";
    } else {
      flagSelection.style.backgroundColor = "var(--no-priority-color)";
      task.priority = "noPriority";
    }
    console.log(task.priority); // confirm task.priority is updated

    // NOTE: IN THE FUTURE, THIS SHOULD UPDATE A CENTRAL TASK MANAGER
    // AND TRIGGER A RE-RENDER OF THE TASK LIST
    // saveTasks();
    updateTasksInProject(task);
    reRenderProjectTasks(task);
    // saveProjects();
  });
};

// Function to display each task
let displayTask = function (task, divToDisplay) {
  let taskList = divToDisplay.querySelector(".taskList");
  let listItem = document.createElement("li");
  listItem.id = task.taskName;

  // Top row of the list item
  let listTopRow = document.createElement("span");
  listTopRow.className = "listTopRow";

  // 4 elements to add into list top row: check box, task name, priority flag, remove buttons
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "checkbox";

  // Add checkbox functionality
  if (task.checked) {
    listItem.className = "completed";
    checkbox.setAttribute("checked", "true");
  } else {
    listItem.className = "";
    // checkbox.setAttribute("checked", "false");
    checkbox.removeAttribute("checked");
  }

  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      listItem.className = "completed";
      task.checked = true;
    } else {
      listItem.className = "";
      task.checked = false;
    }

    // NOTE: IN THE FUTURE, THIS SHOULD UPDATE A CENTRAL TASK MANAGER
    // AND TRIGGER A RE-RENDER OF THE TASK LIST
    saveTasks();
    updateTasksInProject(task);
    saveProjects();
    reRenderProjectTasks(task);
  });

  let taskName = document.createElement("span");
  taskName.className = "taskName";
  taskName.textContent = task.taskName;

  let taskRemoveButton = document.createElement("button");
  taskRemoveButton.setAttribute("aria-label", "Remove task");
  taskRemoveButton.className = "taskRemoveButton";
  taskRemoveButton.innerHTML = `&#x1F5D1;`;

  // Display priority flag
  let flagSelection = createFlag(task);

  // Allow changing priority flag and update task.priority
  updateFlag(task, flagSelection);

  // Finally, append 4 elements into listTopRow
  listTopRow.append(checkbox, taskName, flagSelection, taskRemoveButton);

  // Second row of task item: task description
  let taskDescription = document.createElement("p");
  taskDescription.className = "taskDescription";
  taskDescription.textContent = task.taskDescription;

  // Third row of task item: due date and date picker button
  let listThirdRow = document.createElement("div");
  listThirdRow.className = "listThirdRow";

  let dueDateDisplay = document.createElement("p");
  dueDateDisplay.className = "dueDateDisplay";

  setDueDate(task, dueDateDisplay);

  let calendarButton = createDatePicker(task);
  calendarButton.addEventListener("change", () => {
    setDueDate(task, dueDateDisplay);
    // update task in storage
    saveTasks();
    /////////////////////////////////////////////
    /////////////////////////////////////////////
    // Rerender the tasks inside project page
    // const divToDisplay = document.querySelector(".projectContainer");
    // const projectToDisplay = getAllProjects().find(
    //   (p) => p.name === task.project
    // );
    // const projectList = divToDisplay.querySelector("#projectList");
    // console.log(projectList);
    // const projectBtns = projectList.querySelectorAll("li");
    // if (projectToDisplay) {
    //   displayProject(projectToDisplay, divToDisplay);
    //   const projectPage = document.querySelector(".projectPage");
    //   if (projectPage.style.display === "block") {
    //     projectBtns.forEach((btn) => {
    //       if (btn.id === task.project) {
    //         btn.click();
    //       }
    //     });
    //   }
    // }
    //The above code works. Replacing with reRenderProjecTasks()
    reRenderProjectTasks(task);
    ///////////////////////////////////////
  });

  listThirdRow.append(calendarButton, dueDateDisplay);

  // Append top row, second and third rows into list item
  listItem.append(listTopRow, taskDescription, listThirdRow);

  // Create a divider line to separate next task
  let divider = document.createElement("div");
  divider.className = "divider";

  // Finally, append list item and divider into task list
  taskList.append(listItem, divider);

  // Activate Remove Task button functionality
  removeTaskDisplay(task, taskRemoveButton);
};

// Function to remove task
let removeTaskDisplay = function (task, removeButton) {
  let taskToRemove = removeButton.parentElement.parentElement;
  let parentNode = taskToRemove.parentElement;
  let dividerToRemove = taskToRemove.nextElementSibling;

  removeButton.addEventListener("click", () => {
    parentNode.removeChild(taskToRemove);
    if (dividerToRemove) {
      // make sure only remove if it exist
      parentNode.removeChild(dividerToRemove);
    }
    // remove task inside task manager
    removeTask(task);

    // NOTE: IN THE FUTURE, THIS SHOULD UPDATE A CENTRAL TASK MANAGER
    // AND TRIGGER A RE-RENDER OF THE TASK LIST
    saveTasks();
    saveProjects();
    // updateTasksInProject(task);
  });
};

export {
  createTask,
  displayTask,
  removeTaskDisplay,
  setDueDate,
  createDatePicker,
  createFlag,
  updateFlag,
};
