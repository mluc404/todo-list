import { createProject, displayProject } from "./projectHandler";
import { addProject, getAllProjects } from "./taskManager";

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
    console.log(divToDisplay);
    displayProject(project, divToDisplay);

    // Testing new functions from projectManager
    // Add the newly created task into taskManager
    addProject(project);
    console.log(getAllProjects());

    // let allTasks = getAllTasks();
    // console.table(allTasks);

    // let todayTasks = getTasksDueToday();
    // console.table(todayTasks);

    // let randomDate = "2025-05-25";
    // let arr = filterTasksByDueDate(randomDate);
    // console.table(arr);

    // let arr = filterTasksByPriority("high");
    // console.table(filterTasksByPriority("high"));

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
};

export { initProjectForm };
