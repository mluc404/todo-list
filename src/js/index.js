import "../css/general.css";
import "../css/sidebar.css";
import "../css/form.css";
import "../css/taskDisplay.css";
import { initForm } from "./formHandler.js";
import { initUI } from "./uiController.js";

// Initialize the app
initForm();
initUI();

// Remove the sample task "Go get eggs"
let removeSampleTask = (function () {
  let taskList = document.querySelector(".taskList");
  let removeButton = document.querySelector(".taskRemoveButton");
  let taskToRemove = removeButton.parentElement.parentElement;
  let dividerToRemove = taskToRemove.nextElementSibling;
  removeButton.addEventListener("click", () => {
    taskList.removeChild(taskToRemove);
    taskList.removeChild(dividerToRemove);
  });
})();

import { isToday } from "date-fns";
import { toZonedTime } from "date-fns-tz";

let date = "2025-03-22";

let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the user's local time zone
let zonedDate = toZonedTime(date, timeZone);
console.log(`is today?  ${isToday(zonedDate)}`);
