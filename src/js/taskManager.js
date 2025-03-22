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
import { format, isMatch, isToday } from "date-fns";

// Store tasks and projects in arrays
const tasks = [];
const projects = [{ name: "Default", tasks: [] }]; // default project

// Add a task
const addTask = (task) => {
  tasks.push(task);
};

// Asign task to a project
const assignTaskToProject = (task) => {
  // remove from current project if assigned previously
  if (task.project !== null) {
    const currentProject = projects.find((p) => p.name === task.project);
    const taskIndex = currentProject.tasks.indexOf(task);
    if (taskIndex !== -1) currentProject.tasks.splice(taskIndex, 1);
  }
  // Assign to new project
  const project = projects.find((p) => p.name === task.project);
  project.tasks.push(task);
  task.project = project.name; // update new project in task
};

// Remove task
const removeTask = (task) => {
  // remove from task array
  const taskIndex = tasks.indexOf(task);
  if (taskIndex !== -1) {
    task.splice(taskIndex, 1);
  }
  // remove from associated project
  if (task.project !== null) {
    const currentProject = projects.find((p) => p.name === task.project);
    if (currentProject) {
      const projTaskIndex = currentProject.tasks.indexOf(task);
      if (projTaskIndex !== -1) {
        currentProject.tasks.splice(projTaskIndex, 1);
      }
    }
  }
};

//Get tasks due today
const getTasksDueToday = () => {
  // define today's date
  // filter the tasks the have task.dueDate === today's date
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const todayTasks = tasks.filter((task) => {
    task.dueDate === todayDate;
  });
  return todayTasks;
};

// Filter tasks by priority
const filterTasksByPriority = (priority) => {
  return tasks.filter((task) => {
    task.priority === priority;
  });
};

// Filter tasks by due date
const filterTasksByDueDate = (dueDate) => {
  if (!isMatch(dueDate, "yyyy-MM-dd")) {
    // check if the given dueDate is properly formatted before filtering
    dueDate = format(dueDate, "yyyy-MM-dd");
  }
  return tasks.filter((task) => task.dueDate === dueDate);
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
};
