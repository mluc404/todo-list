import "./styles.css";
import createTask from "./createTask.js";

let formSubmitButton = document.querySelector("#formSubmitButton");
formSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();

  let task = createTask();
  console.log(task);

  handleDOM(task);
});

let handleDOM = function (task) {
  let taskContainer = document.querySelector(".classContainer");
  let taskList = document.querySelector(".taskList");

  taskList.innerHTML += `<li>
  <span class='aTask'>
  <input type='checkbox' class='checkbox'><span>${task.taskName}</span>
  </span>
  <p>${task.taskDescription}</p>
  </li>
  <div class='divider'></div>`;
};
