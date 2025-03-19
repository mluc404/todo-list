export default function createTask() {
  let taskName = document.querySelector("#taskName").value.trim();
  let taskDescription = document.querySelector("#taskDescription").value.trim();
  return { taskName, taskDescription };
}
