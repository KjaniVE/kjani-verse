import {_allData as DATA} from './data/data.js';

if (window.location.href === "projects.html") {
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
    template.setAttribute("href", project.github);
    template.querySelector("h3").textContent = project.title;
    template.querySelector("img").setAttribute("src", project.logo);
    template.querySelector("img").setAttribute("alt", project.alt);

    for (const technology of project.technologies) {
        const $button = document.createElement("button");
        $button.textContent = technology;
        template.querySelector(".proj-tech").insertAdjacentElement("beforeend", $button);
    }

    return template
}

export {createProjectElement};