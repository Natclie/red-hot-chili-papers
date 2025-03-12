
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("#nav-mobile ul");
    const button = document.querySelector("#nav-mobile button");

    button.addEventListener("click", () => {
        nav.classList.toggle("open");
        if (nav.classList.contains("open")) {
            nav.style.top = "20vh";
        } else {
            nav.style.top = "-100vh";
        }
    });
});
