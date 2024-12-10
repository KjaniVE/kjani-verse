import {_allData as DATA} from "./data/data.js";

init();

function init() {
    document.querySelector(".introduction button").addEventListener("click", smoothScroll);
    const selectionButtons = document.querySelectorAll(".selection-buttons button");
    showSelection(selectionButtons);
    renderEducation();
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
    $canvas.innerHTML = "";

    for (const project of projects) {
        $canvas.insertAdjacentElement("beforeend", createProjectElement(project));
    }
}

function createProjectElement(project) {
    const $template = document.querySelector("#proj-tem").content.firstElementChild.cloneNode(true);

    $template.querySelector("h3").textContent = project.title;
    $template.querySelector("img").setAttribute("src", project.logo);
    $template.querySelector("img").setAttribute("alt", project.alt);
    $template.querySelector("a").setAttribute("href", project.github);
    for (const technology of project.technologies) {
        const $button = document.createElement("p");
        $button.disabled = true;
        $button.textContent = technology;
        $template.querySelector(".technologies").insertAdjacentElement("beforeend", $button);
    }

    return $template;
}