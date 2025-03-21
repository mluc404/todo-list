// This module handles task creation, display, and removal

import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Function to get form inputs to create a task object
let createTask = function () {
  let taskName = document.querySelector("#taskName").value.trim();
  let taskDescription = document.querySelector("#taskDescription").value.trim();

  let dueDate = document.querySelector("#dueDate").value;
  let priority = document.querySelector("#priorityChoice").value;

  return { taskName, taskDescription, dueDate, priority };
};

// Function to display each task
let displayTask = function (task) {
  let taskContainer = document.querySelector(".classContainer");
  let taskList = document.querySelector(".taskList");
  let listItem = document.createElement("li");

  // Top row of the list item
  let listTopRow = document.createElement("span");
  listTopRow.className = "listTopRow";

  // 4 elements to add into list top row
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "checkbox";

  let taskName = document.createElement("span");
  taskName.className = "taskName";
  taskName.textContent = task.taskName;

  let taskRemoveButton = document.createElement("button");
  taskRemoveButton.setAttribute("aria-label", "Remove task");
  taskRemoveButton.className = "taskRemoveButton";
  taskRemoveButton.innerHTML = `&#x1F5D1;`;

  // Display priority button that allows changing priority
  // update task.priority if changed
  let option1 = document.createElement("option");
  option1.className = "highPriority";
  let option2 = document.createElement("option");
  option2.className = "medPriority";
  let option3 = document.createElement("option");
  option3.className = "lowPriority";
  option1.innerHTML = "&#127987;";
  option2.innerHTML = "&#127987;";
  option3.innerHTML = "&#127987;";

  let flagSelection = document.createElement("select"); // the <select> to hold 3 options
  flagSelection.className = "flagSelection";

  let selectionDiv = document.createElement("div"); // the div to hold flag seclection
  selectionDiv.className = "selectionDiv";

  flagSelection.append(option1, option2, option3);
  selectionDiv.appendChild(flagSelection);

  if (task.priority === "high") {
    // set default flag based on user's intial priority choice
    option1.selected = true;
    flagSelection.style.backgroundColor = "#e77b50";
  } else if (task.priority === "medium") {
    option2.selected = true;
    flagSelection.style.backgroundColor = "#fdc04e";
  } else if (task.priority === "low") {
    option3.selected = true;
    flagSelection.style.backgroundColor = "#6dbbda";
  }

  flagSelection.addEventListener("change", (e) => {
    // change priority flag and update task.priority
    console.log("<select> obj", e.target.selectedOptions);
    let choice = e.target.selectedOptions[0].className;
    if (choice === "highPriority") {
      flagSelection.style.backgroundColor = "#e77b50";
      task.priority = "high";
    } else if (choice === "medPriority") {
      flagSelection.style.backgroundColor = "#fdc04e";
      task.priority = "medium";
    } else {
      flagSelection.style.backgroundColor = "#6dbbda";
      task.priority = "low";
    }
    console.log(task.priority); // confirm task.priority is updated
  });

  // Finally, append 4 elements into listTopRow
  listTopRow.append(checkbox, taskName, selectionDiv, taskRemoveButton);

  // Second row of task item: task description
  let taskDescription = document.createElement("p");
  taskDescription.className = "taskDescription";
  taskDescription.textContent = task.taskDescription;

  // Third row of task item: due date
  let dueDateDisplay = document.createElement("p");
  dueDateDisplay.className = "dueDateDisplay";

  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the user's local time zone
  // console.log("my zone: ", timeZone);
  let zonedDate = toZonedTime(task.dueDate, timeZone); // Convert the date into user time zone
  let formattedDate = format(zonedDate, "EEEE, MMM dd");
  // let formattedDate = format(zonedDate, "eeee - MMM dd, yyyy"); // is year necessary?

  if (isToday(zonedDate)) dueDateDisplay.textContent = "Today";
  else if (isTomorrow(zonedDate)) dueDateDisplay.textContent = "Tomorrow";
  else if (isYesterday(zonedDate)) dueDateDisplay.textContent = "Yesterday";
  else {
    dueDateDisplay.textContent = `${formattedDate}`;
  }

  // Append top row, second and third rows into list item
  listItem.append(listTopRow, taskDescription, dueDateDisplay);

  // Create a divider line to separate next task
  let divider = document.createElement("div");
  divider.className = "divider";

  // Finally, append list item and divider into task list
  taskList.append(listItem, divider);

  // Activate Remove Task button functionality
  removeTask(taskRemoveButton);

  // Add checkbox functionality
  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      listItem.className = "completed";
    } else {
      listItem.className = "";
    }
  });
};

// Function to remove task
let removeTask = function (removeButton) {
  let taskToRemove = removeButton.parentElement.parentElement;
  let parentNode = taskToRemove.parentElement;
  let dividerToRemove = taskToRemove.nextElementSibling;

  removeButton.addEventListener("click", () => {
    parentNode.removeChild(taskToRemove);
    if (dividerToRemove) {
      // make sure only remove if it exist
      parentNode.removeChild(dividerToRemove);
    }
  });
};

export { createTask, displayTask, removeTask };
