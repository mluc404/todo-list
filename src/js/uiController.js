// This module handles UI interactions like page toggling

const initUI = () => {
  let todayPage = document.querySelector(".todayPage");
  let todayTabButton = document.querySelector(".todayTabButton");
  let projectPage = document.querySelector(".projectPage");
  let projectTabButton = document.querySelector(".projectTabButton");

  // Clicking a button will turn off the other pages
  projectTabButton.addEventListener("click", () => {
    todayPage.style.display = "none";
    projectPage.style.display = "block";
  });

  todayTabButton.addEventListener("click", () => {
    todayPage.style.display = "block";
    projectPage.style.display = "none";
  });
};

export { initUI };
