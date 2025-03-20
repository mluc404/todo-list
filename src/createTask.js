import { format } from "date-fns";

// Function to get form inputs to create a task object
let createTask = function () {
  let taskName = document.querySelector("#taskName").value.trim();
  let taskDescription = document.querySelector("#taskDescription").value.trim();

  let todayDate = new Date();
  console.log(todayDate);

  let dueDate = document.querySelector("#dueDate");
  dueDate.setAttribute("value", todayDate);

  // will add due date, priority in task obj later
  return { taskName, taskDescription };
};

// Function to display each task
let displayTask = function (task) {
  let taskContainer = document.querySelector(".classContainer");
  let taskList = document.querySelector(".taskList");
  let listItem = document.createElement("li");

  // Top row of the list item
  let listTopRow = document.createElement("span");
  listTopRow.className = "listTopRow";

  // 3 elements to add into list top row
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

  listTopRow.append(checkbox, taskName, taskRemoveButton);

  // Bottom row of task item
  let taskDescription = document.createElement("p");
  taskDescription.className = "taskDescription";
  taskDescription.textContent = task.taskDescription;

  // Append top row and task description into list item
  listItem.append(listTopRow, taskDescription);

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
