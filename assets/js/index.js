import {_allData as DATA} from "./data/data.js";
import {createProjectElement} from "./projects.js";

init();

function init() {
    document.querySelector(".introduction button").addEventListener("click", smoothScroll);
    const selectionButtons = document.querySelectorAll(".selection-buttons button");
    showSelection(selectionButtons);
    renderEducation();
    renderRecentProjects();
}

function smoothScroll() {
    document.querySelector(".edu-proj").scrollIntoView({
        behavior: 'smooth'
    });
}

function showSelection(selectionButtons) {
    selectionButtons.forEach(button => {
        button.addEventListener("click", showSelected);
    })
}

function showSelected(e) {
    e.preventDefault();
    const selected = e.target.dataset.target;
    showContent(selected);
    makeButtonsEnabled(e.target);
}

function makeButtonsEnabled(clickedButton) {
    const selectionButtons = document.querySelectorAll(".selection-buttons button");
    selectionButtons.forEach(button => {
        button.classList.remove("active");
        button.disabled = false;
    });
    clickedButton.disabled = true;
    clickedButton.classList.add("active");
}

function showContent(content) {
    if (content === "education") {
        renderEducation();
    } else {
        renderProjects();
    }
}

function renderEducation() {
    const education = DATA.education
    const $canvas = document.querySelector(".edu-proj article");
    $canvas.innerHTML = "";

    for (const educationElement of education) {
        $canvas.insertAdjacentElement("beforeend", createEducationElement(educationElement));
    }
}

function createEducationElement(educationElement) {
    const $template = document.querySelector("#edu-tem").content.firstElementChild.cloneNode(true);
    $template.querySelector("img").setAttribute("src", educationElement.logo);
    $template.querySelector("img").setAttribute("alt", educationElement.alt);
    $template.querySelector(".date").textContent = educationElement.date;
    $template.querySelector(".institution").textContent = educationElement.institution;
    $template.querySelector(".type").textContent = educationElement.type;
    $template.querySelector(".degree").textContent = educationElement.degree;

    return $template;
}

function renderProjects() {
    const projects = DATA.projects;
    const $canvas = document.querySelector(".edu-proj article");
    const $template = document.querySelector("#proj").content.firstElementChild.cloneNode(true);
    $canvas.innerHTML = "";

    for (const project of projects) {
        $canvas.insertAdjacentElement("beforeend", createProjectElement(project, $template));
    }
}

function renderRecentProjects() {
    const recentProject = DATA.projects[0];
    const $canvas = document.querySelector(".recent-proj");
    const $template = document.querySelector("#rec-proj").content.firstElementChild.cloneNode(true);
    $canvas.innerHTML = "";

    $canvas.insertAdjacentElement("beforeend", createProjectElement(recentProject, $template));
}