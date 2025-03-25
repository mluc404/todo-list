// This module manages Tasks and Projects: store them, and provide methods to manipulate and query them

// Store tasks and projects in arrays
// Add a task to task array
// Assign a task to a project, remove from current project first if was assigned previously
// Remove a task from array, from associated project
// Add a project to project array
// Remove a project from array
// Get all tasks
// Get all projects
// Get tasks due today
// Get tasks for a project
// Filter tasks by priority
// Filter tasks by due date

////////////////////////////////////////////////////
import { format, isMatch, isToday, parseJSON } from "date-fns";

// Local storage for tasks and proj
const saveTasks = () => {
  const storedTasks = getAllTasks();
  localStorage.setItem("myTasks", JSON.stringify(storedTasks));
  const myTasks = JSON.parse(localStorage.getItem("myTasks"));
  console.log(myTasks);
};
const retrieveTasks = () => {
  return JSON.parse(localStorage.getItem("myTasks"));
};
const saveProjects = () => {
  const storedProjects = getAllProjects();
  localStorage.setItem("myProjects", JSON.stringify(storedProjects));
  const myProjects = JSON.parse(localStorage.getItem("myProjects"));
  console.log(myProjects);
};
const retrieveProjects = () => {
  return JSON.parse(localStorage.getItem("myProjects"));
};

// Store tasks and projects in arrays
// Retrieve stored tasks
let tasks = [];
let retrievedTasks = retrieveTasks();
if (retrieveTasks) tasks = retrievedTasks;
console.log("this is tasks: ", tasks);

// Retrieve stored projects
let projects = [{ name: "Default", tasks: [] }]; // default project
let retrievedProjects = retrieveProjects();
if (retrieveProjects) projects = retrievedProjects;

// Add a task
const addTask = (task) => {
  tasks.push(task);
};

// Asign task to a project
const assignTaskToProject = (task) => {
  // remove from current project if assigned previously
  if (task.project !== null) {
    const currentProject = projects.find((p) => p.name === task.project);
    if (currentProject) {
      const taskIndex = currentProject.tasks.indexOf(task);
      if (taskIndex !== -1) currentProject.tasks.splice(taskIndex, 1);
    }
  }
  // Assign to new project
  const project = projects.find((p) => p.name === task.project);
  if (project) {
    project.tasks.push(task);
    task.project = project.name; // update new project in task

    console.table(task);
    console.table(project);
  }

  return;
};

// Remove task
const removeTask = (task) => {
  // remove from task array
  const taskIndex = tasks.indexOf(task);
  console.log("here", taskIndex);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    console.log(tasks);
  }
  // remove from associated project
  // if (task.project !== null) {
  //   const currentProject = projects.find((p) => p.name === task.project);
  //   if (currentProject) {
  //     const projTaskIndex = currentProject.tasks.indexOf(task);
  //     if (projTaskIndex !== -1) {
  //       currentProject.tasks.splice(projTaskIndex, 1);
  //     }
  //   }
  // }
};

//Get tasks due today
const getTasksDueToday = () => {
  // define today's date
  // filter the tasks the have task.dueDate === today's date
  const todayDate = format(new Date(), "yyyy-MM-dd");
  return tasks.filter((task) => task.dueDate === todayDate);
};

// Filter tasks by due date
const filterTasksByDueDate = (dueDate) => {
  if (!isMatch(dueDate, "yyyy-MM-dd")) {
    // check if the given dueDate is properly formatted before filtering
    dueDate = format(dueDate, "yyyy-MM-dd");
  }
  return tasks.filter((task) => task.dueDate === dueDate);
};

// Filter tasks by priority
const filterTasksByPriority = (priority) => {
  return tasks.filter((task) => task.priority === priority);
};

// Get tasks for a project
const getTasksForProject = (projectName) => {
  const project = projects.find((p) => p.name === projectName);
  return project ? project.tasks : []; // return tasks of project or an empty array if project DNE
};

// Add project
const addProject = (project) => {
  projects.push(project);
};

// Remove project
const removeProject = (project) => {
  const projIndex = projects.indexOf(project);
  if (projIndex !== -1) projects.splice(projIndex, 1);
};

// Get all tasks
const getAllTasks = () => {
  return tasks;
};

// Get all projects
const getAllProjects = () => {
  return projects;
};

// const storedProjects = getAllProjects();

export {
  addTask,
  assignTaskToProject,
  removeTask,
  getAllTasks,
  getTasksDueToday,
  filterTasksByDueDate,
  filterTasksByPriority,
  addProject,
  getTasksForProject,
  removeProject,
  getAllProjects,
  saveTasks,
  saveProjects,
};
