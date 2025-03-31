// This module handle the functionality inside the task creation input form

import { createTask, displayTask, removeTaskDisplay } from "./taskHandler.js";
import { format } from "date-fns";
import { displayStoredProjects } from "./uiController.js";
import {
  addTask,
  getAllTasks,
  filterTasksByDueDate,
  filterTasksByPriority,
  getTasksDueToday,
  getAllProjects,
  assignTaskToProject,
  saveTasks,
  saveProjects,
  retrieveProjects,
} from "./taskManager.js";
import { displayProject } from "./projectHandler.js";

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

  // Handle assign to project
  let projectChoice = document.querySelector("#projectChoice");
  projectChoice.addEventListener("change", (e) => {
    e.preventDefault();
    console.log(e.target.value);
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

    // Update local storage
    saveTasks();
    saveProjects();

    // Add the task to project
    if (task.project !== "Assign project") {
      assignTaskToProject(task);
      if (task.project !== "Assign project") {
        assignTaskToProject(task);
        saveProjects();
        displayStoredProjects(); // Re-render projects and their tasks
      }

      // Re-render the projects in project page to show the added tasks
      // displayStoredProjects(); // this was working in last commit

      // this code block works but should be inside displayProject()
      // let spaceForTasksInProject = document.querySelector(
      //   ".spaceForTasksInProject"
      // );
      // let projDivForTask = spaceForTasksInProject.querySelector(
      //   "#" + task.project
      // );
      // console.log(projDivForTask);
      // displayTask(task, projDivForTask);
      ///////////////////////////////////////

      // // Call displayProject() instead
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
    }

    // Render task in project page
    // const projectList = document.querySelector("#projectList");
    // // find the <li> that has id = task.project or id = assignedProject.name
    // const listItem = document.querySelector(#${task.project});
    // console.log(listItem);
    // const tasksInProject = listItem.querySelector("#tasksInProject");
    // const listItemInside = document.createElement("li");
    // listItemInside.className = "taskList";
    // tasksInProject.appendChild(listItemInside);
    // displayTask(task, tasksInProject);

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
  let dialog = document.querySelector(".taskDialog");

  addTaskButton.addEventListener("click", () => {
    dialog.showModal();
    // Query all projects to generate options for 'Assign project' button
    let projectChoice = document.querySelector("#projectChoice");
    let currentOptions = projectChoice.querySelectorAll("option");
    let optionNames = [];
    currentOptions.forEach((option) => {
      optionNames.push(option.textContent);
    });
    console.log("option names: ", optionNames);

    retrieveProjects();
    let projects = getAllProjects();
    console.log("retrieve projects:", projects);
    // remove project options if the projects were removed before
    currentOptions.forEach((option) => {
      let foundOption = projects.find((p) => p.name === option.textContent);
      if (!foundOption && option.textContent !== "Assign project") {
        projectChoice.removeChild(option);
      }
    });

    // add new project option
    projects.forEach((project) => {
      let foundName = optionNames.find((name) => name === project.name);
      if (!foundName) {
        let option = document.createElement("option");
        option.textContent = project.name;
        projectChoice.appendChild(option);
      }
    });
  });

  closeFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });
};

export { initForm };
