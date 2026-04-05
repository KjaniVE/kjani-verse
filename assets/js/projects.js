import {_allData as DATA} from './data/data.js';

if (window.location.pathname.includes("projects.html")) {
    init();
}

function init() {
    renderProjects(DATA.projects);
}

function renderProjects(data) {
    const $canvas = document.querySelector(".proj-list");
    $canvas.innerHTML = "";

    for (const project of data) {
        const $template = document.querySelector("#proj").content.firstElementChild.cloneNode(true);
        $canvas.insertAdjacentElement("beforeend", createProjectElement(project, $template));
    }
}

function createProjectElement(project, template) {
    template.querySelector("h3").textContent = project.title;
    template.querySelector("img").setAttribute("src", project.logo);
    template.querySelector("img").setAttribute("alt", project.alt);

    for (const technology of project.technologies) {
        const $button = document.createElement("button");
        $button.textContent = technology;
        $button.disabled = true;
        template.querySelector(".proj-tech").insertAdjacentElement("beforeend", $button);
    }

    if (project.github) {
        const $wrapper = document.createElement("a");
        $wrapper.setAttribute("href", project.github);
        $wrapper.setAttribute("target", "_blank");
        $wrapper.appendChild(template);
        return $wrapper;
    }

    return template;
}

export {createProjectElement};