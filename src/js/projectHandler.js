import {
  removeProject,
  getTasksForProject,
  saveProjects,
  getAllTasks,
  retrieveTasks,
} from "./taskManager";
import { displayTask } from "./taskHandler";
import { displayStoredProjects } from "./uiController";

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

  listItem.id = project.name.replace(/\s/g, "");
  listItem.className = "taskList";
  listItem.classList.add("projectNameButton");

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
  taskRemoveButton.id = "projectRemoveButton";
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

  ////////////////////////////////////////
  ////////////////////////////////////////
  ////////////////////////////////////////
  // RE-DISPLAY TASKS INSIDE spaceForTasksInProject
  const spaceForTasksInProject = document.querySelector(
    ".spaceForTasksInProject"
  );
  const taskListInProject = spaceForTasksInProject.querySelector("ul");
  const newTaskDiv = spaceForTasksInProject.querySelector("#projectList02");
  const currentListItems = newTaskDiv.querySelectorAll("li");
  console.log(currentListItems);
  let listId = [];
  currentListItems.forEach((li) => listId.push(li.id));
  console.log("list id:", listId);

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // Generate separate div for each project tasks container 03/26
  let thisDiv = document.createElement("div");
  thisDiv.className = "thisDiv";
  thisDiv.id = project.name.replace(/\s/g, "");
  let ulInThisDiv = document.createElement("ul");
  ulInThisDiv.className = "ulInThisDiv";
  ulInThisDiv.classList.add("taskList");

  thisDiv.appendChild(ulInThisDiv);
  spaceForTasksInProject.appendChild(thisDiv);

  // check for existing <li> inside ulInThisDiv before adding new li for task
  let allLis = ulInThisDiv.querySelectorAll("li");
  // The code to display the tasks for each project inside its .thisDiv
  let projectIdSelector = project.name.replace(/\s/g, "");
  let projDivForTask = spaceForTasksInProject.querySelector(
    "#" + projectIdSelector
  );
  console.log(projDivForTask);
  project.tasks.forEach((task) => {
    if (allLis.length > 0) {
      let isValid = true;
      allLis.forEach((li) => {
        if (task.taskName === li.id) {
          console.log(li.id);
          console.log(task.taskName);
          isValid = false;
        }
      });
      if (isValid) {
        displayTask(task, projDivForTask);
      }
    } else {
      displayTask(task, projDivForTask);
    }
  });

  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  // Toggle project tasks visibility
  // Find all .thisDiv then turn on only the one has id=project.name
  let projectTitleDispaly = document.querySelector("#projectTitleDisplay");

  listItem.addEventListener("click", (e) => {
    document.querySelector(".projectPage").style.display = "block";
    document.querySelector(".todoPage").style.display = "none";
    document.querySelector(".todayPage").style.display = "none";

    let allThisDivs = spaceForTasksInProject.querySelectorAll(".thisDiv");
    allThisDivs.forEach((div) => {
      if (div.id === project.name.replace(/\s/g, "")) {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    });

    // if (listItem.style.backgroundColor === "red") {
    //   listItem.style.backgroundColor = "transparent";
    // } else {
    //   listItem.style.backgroundColor = "red";
    // }
    console.log(listItem);
    projectTitleDispaly.textContent =
      listItem.querySelector(".taskName").textContent;
  });

  // On hover each Project name, show the remove project button
  listItem.addEventListener("mouseenter", (e) => {
    taskRemoveButton.style.opacity = 1;
  });
  listItem.addEventListener("mouseleave", (e) => {
    taskRemoveButton.style.opacity = 0;
  });
  ///////////////////////////////////////////
  ///////////////////////////////////////////
  ///////////////////////////////////////////

  // Append top row, second and third rows into list item
  // listItem.append(listTopRow, projectDescription, listThirdRow, tasksDiv);

  // Actually just first row for project nav list
  listItem.append(listTopRow);

  // Create a divider line to separate next task
  let divider = document.createElement("div");
  divider.className = "divider";

  // Finally, append list item and divider into task list

  let allListItems = projectList.querySelectorAll("li");
  let allListItemsArr = new Array(allListItems);

  console.log(allListItems);
  console.log(allListItemsArr);
  if (allListItems.length > 0) {
    // allListItems.forEach((li) => {
    //   console.log(`list item id: ${listItem.id}`);
    //   console.log(`<li> id: ${li.id}`);
    //   if (listItem.id !== li.id) {
    //     projectList.append(listItem, divider);
    //   }
    // });
    let isValid = true;
    allListItems.forEach((li) => {
      console.log(`list item id: ${listItem.id}`);
      console.log(`<li> id: ${li.id}`);
      if (listItem.id === li.id) {
        console.log("heeeeeeeeeeeeeee");
        isValid = false;
        // projectList.removeChild(li);
      }
    });
    if (isValid) {
      projectList.append(listItem, divider);
    }

    // console.log(listItem.id);
    // let ifNotExisted = allListItemsArr.every((li) => li.id !== listItem.id);
    // console.log("is project not displayed yet: ", ifNotExisted);

    // if (ifNotExisted) {
    //   projectList.append(listItem, divider);
    // }listItem.id
  } else {
    console.log("not heree");
    projectList.append(listItem, divider);
  }

  /////////////

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

    // remove tasks display in project page
    const spaceForTasksInProject = document.querySelector(
      ".spaceForTasksInProject"
    );
    let allThisDivs = spaceForTasksInProject.querySelectorAll(".thisDiv");
    allThisDivs.forEach((div) => {
      if (div.id === project.name) {
        console.log("hereeeeeeeeeeeeee");
        spaceForTasksInProject.removeChild(div);
      }
    });

    // const thisDiv = spaceForTasksInProject.querySelector("#" + project.id);
    // thisDiv.innerHTML = "";
  });
};

export { createProject, displayProject };
