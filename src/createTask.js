import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// Function to get form inputs to create a task object
let createTask = function () {
  let taskName = document.querySelector("#taskName").value.trim();
  let taskDescription = document.querySelector("#taskDescription").value.trim();

  let dueDate = document.querySelector("#dueDate").value;
  console.log(dueDate);
  // let dueDate = null;
  // calendar.addEventListener("change", (e) => {
  //   console.log(e);
  //   dueDate = e.target.value;
  // });

  // will add due date, priority in task obj later
  return { taskName, taskDescription, dueDate };
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

  // Second row of task item
  let taskDescription = document.createElement("p");
  taskDescription.className = "taskDescription";
  taskDescription.textContent = task.taskDescription;

  // Third row of task item
  let dueDateDisplay = document.createElement("p");
  dueDateDisplay.className = "dueDateDisplay";

  // Get the user's local time zone
  let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("my zone: ", timeZone);
  // Convert the date into user time zone
  let zonedDate = toZonedTime(task.dueDate, timeZone);
  // Format the date for display
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
