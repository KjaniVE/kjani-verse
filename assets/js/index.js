init();

function init() {
    document.querySelector(".introduction button").addEventListener("click", smoothScroll);
}

function smoothScroll() {
    document.querySelector(".edu-proj").scrollIntoView({
        behavior: 'smooth'
    });
}
