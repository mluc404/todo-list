import { removeProject, getTasksForProject, saveProjects } from "./taskManager";
import { displayTask } from "./taskHandler";

let createProject = function () {
  let name = document.querySelector("#projectName").value.trim();
  let description = document.querySelector("#projectDescription").value.trim();
  let tasks = [];

  //   let dueDate = document.querySelector("#dueDate").value;
  //   let priority = document.querySelector("#priorityChoice").value;

  //   let checked = false;

  return { name, description, tasks };
};

// Function to display each project
let displayProject = function (project, divToDisplay) {
  let projectList = divToDisplay.querySelector("#projectList");
  let listItem = document.createElement("li");
  listItem.id = project.name;
  listItem.className = "taskList";

  // Top row of the list item
  let listTopRow = document.createElement("span");
  listTopRow.className = "listTopRow";
  listTopRow.classList.add("projectListTopRow");

  // 4 elements to add into list top row: check box, task name, priority flag, remove buttons
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "checkbox";

  //   // Add checkbox functionality
  //   if (task.checked) {
  //     listItem.className = "completed";
  //     checkbox.setAttribute("checked", "true");
  //   } else {
  //     listItem.className = "";
  //     // checkbox.setAttribute("checked", "false");
  //     checkbox.removeAttribute("checked");
  //   }

  //   checkbox.addEventListener("change", (e) => {
  //     if (e.target.checked) {
  //       listItem.className = "completed";
  //       task.checked = true;
  //     } else {
  //       listItem.className = "";
  //       task.checked = false;
  //     }
  //   });

  let projectName = document.createElement("span");
  projectName.className = "taskName";
  // projectName.id = 'projectName'
  projectName.textContent = project.name;

  let taskRemoveButton = document.createElement("button");
  taskRemoveButton.setAttribute("aria-label", "Remove task");
  taskRemoveButton.className = "taskRemoveButton";
  taskRemoveButton.innerHTML = `&#x1F5D1;`;

  //   // Display priority flag
  //   let flagSelection = createFlag(task);

  //   // Allow changing priority flag and update task.priority
  //   updateFlag(task, flagSelection);

  // Finally, append 4 elements into listTopRow
  listTopRow.append(projectName, taskRemoveButton);

  // Second row of task item: task description
  let projectDescription = document.createElement("p");
  projectDescription.className = "taskDescription";
  projectDescription.textContent = project.description;

  // Third row of task item: due date and date picker button
  let listThirdRow = document.createElement("div");
  listThirdRow.className = "listThirdRow";

  // // Display the tasks for this project
  // let tasks = getTasksForProject(project.name);
  // tasks.forEach((task) => {
  //   display(task);
  // });

  //   let dueDateDisplay = document.createElement("p");
  //   dueDateDisplay.className = "dueDateDisplay";

  //   setDueDate(task, dueDateDisplay);

  //   let calendarButton = createDatePicker(task);
  //   calendarButton.addEventListener("change", () => {
  //     setDueDate(task, dueDateDisplay);
  //   });

  //   listThirdRow.append(calendarButton, dueDateDisplay);

  // 4th row to display tasks
  const tasksDiv = document.createElement("div");
  tasksDiv.id = "tasksInProject";

  // Render task in project page
  // const projectList = document.querySelector("#projectList");
  // find the <li> that has id = task.project or id = assignedProject.name
  // const listItem = document.querySelector(`#${task.project}`);
  // console.log(listItem);
  // const tasksInProject = listItem.querySelector("#tasksInProject");
  const listItemInside = document.createElement("li");
  listItemInside.className = "taskList";
  tasksDiv.appendChild(listItemInside);
  if (project.tasks.length > 0) {
    project.tasks.forEach((task) => displayTask(task, tasksDiv));
  }

  // Append top row, second and third rows into list item
  listItem.append(listTopRow, projectDescription, listThirdRow, tasksDiv);

  // Create a divider line to separate next task
  let divider = document.createElement("div");
  divider.className = "divider";

  // Finally, append list item and divider into task list
  projectList.append(listItem, divider);

  // Activate Remove Task button functionality
  removeProjectDisplay(project, taskRemoveButton);
};

// Function to remove task
let removeProjectDisplay = function (project, removeButton) {
  let projectToRemove = removeButton.parentElement.parentElement;
  let parentNode = projectToRemove.parentElement;
  let dividerToRemove = projectToRemove.nextElementSibling;

  removeButton.addEventListener("click", () => {
    parentNode.removeChild(projectToRemove);
    if (dividerToRemove) {
      // make sure only remove if it exist
      parentNode.removeChild(dividerToRemove);
    }
    // remove project inside project manager
    removeProject(project);

    // update project in local storage
    saveProjects();
  });
};

export { createProject, displayProject };
