import { createProject, displayProject } from "./projectHandler";
import {
  addProject,
  getAllProjects,
  saveProjects,
  retrieveProjects,
} from "./taskManager";

// Initialize form
const initProjectForm = () => {
  let form = document.querySelector(".projectForm");
  //   let todayDate = format(new Date(), "yyyy-MM-dd");
  //   // Set default current date in due date calender
  //   document.querySelector("#dueDate").setAttribute("value", todayDate);

  //   // Handle task priority selection
  //   let priorityChoice = document.querySelector("#priorityChoice");
  //   priorityChoice.addEventListener("change", (e) => {
  //     console.log("<select> obj", e.target.selectedOptions);
  //     console.log(e.target.value);
  //     let choice = e.target.value;
  //     if (choice === "high") priorityChoice.style.backgroundColor = "#e77b50";
  //     else if (choice === "medium")
  //       priorityChoice.style.backgroundColor = "#fdc04e";
  //     else if (choice === "low") priorityChoice.style.backgroundColor = "#6dbbda";
  //     else priorityChoice.style.backgroundColor = "var(--dialog-bg-color, white)";
  //   });

  // Handle form submission
  let formSubmitButton = form.querySelector("#projectFormSubmitButton");
  //   let selectPriority = form.querySelector("select");

  formSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let project = createProject();
    const divToDisplay = document.querySelector(".projectContainer");
    displayProject(project, divToDisplay);

    // Add the newly created task into taskManager
    addProject(project);

    // Save project to local storage
    saveProjects();

    // Create div inside "spaceForTasksInProject"
    let spaceForTasksInProject = document.querySelector(
      ".spaceForTasksInProject"
    );
    // let projectTasksDiv = document.createElement("div");
    // projectTasksDiv.className = "projectTasksDiv";

    // spaceForTasksInProject.appendChild(projectTasksDiv);

    // selectPriority.style.backgroundColor = "var(--dialog-bg-color, white)"; // reset to default None
    form.reset();
  });

  // Open/close form dialog
  let addProjectButton = document.querySelector(".addProjectButton");
  let closeFormButton = document.querySelector(".closeProjectFormButton");
  let dialog = document.querySelector(".projectDialog");

  addProjectButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeFormButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
  });

  //////////////////////////////////////////////////////////
  // Open close task form for project
  let addTaskButton02 = document.querySelector("#addTaskButton-02");
  let addTaskButton01 = document.querySelector("#addTaskButton-01");

  addTaskButton02.addEventListener("click", () => {
    addTaskButton01.click();
  });

  // closeTaskFormInProjectBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   dialogTaskinProject.close();
  // });
};

export { initProjectForm };
