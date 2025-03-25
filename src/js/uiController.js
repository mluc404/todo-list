// This module handles UI interactions like page toggling

import {
  getAllProjects,
  getAllTasks,
  getTasksDueToday,
} from "./taskManager.js";
import { displayTask } from "./taskHandler.js";
import { displayProject } from "./projectHandler.js";

const initUI = () => {
  let todoPage = document.querySelector(".todoPage");
  let todoTabButton = document.querySelector(".todoTabButton");

  let todayPage = document.querySelector(".todayPage");
  let todayTabButton = document.querySelector(".todayTabButton");

  let projectPage = document.querySelector(".projectPage");
  let projectTabButton = document.querySelector(".projectTabButton");

  // Clicking a button will turn off the other pages

  projectTabButton.addEventListener("click", () => {
    projectPage.style.display = "block";
    todayPage.style.display = "none";
    todoPage.style.display = "none";

    const divToDisplay = document.querySelector(".projectContainer");
    const projects = getAllProjects();

    const ulInsideDiv = divToDisplay.querySelector("ul");
    ulInsideDiv.innerHTML = "";
    projects.forEach((project) => {
      displayProject(project, divToDisplay);
    });
  });

  todayTabButton.addEventListener("click", () => {
    todayPage.style.display = "block";
    todoPage.style.display = "none";
    projectPage.style.display = "none";

    // Display the tasks due today
    const divToDisplay = document.querySelector(
      ".taskContainer.todayTaskContainer"
    );
    const ulInsideDiv = divToDisplay.querySelector("ul");
    ulInsideDiv.innerHTML = "";
    const todayTasks = getTasksDueToday();
    todayTasks.forEach((task) => {
      displayTask(task, divToDisplay);
    });
  });

  todoTabButton.addEventListener("click", () => {
    todoPage.style.display = "block";
    todayPage.style.display = "none";
    projectPage.style.display = "none";

    // Display all available tasks
    const divToDisplay = document.querySelector(
      ".taskContainer.todoTaskContainer"
    );
    const ulInsideDiv = divToDisplay.querySelector("ul");
    ulInsideDiv.innerHTML = "";
    const todoTasks = getAllTasks();
    todoTasks.forEach((task) => {
      displayTask(task, divToDisplay);
    });
  });
};

export { initUI };
