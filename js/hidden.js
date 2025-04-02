document.addEventListener("DOMContentLoaded", function () {
    const switchButton = document.querySelector(".content-switch");
    const headerButtons = document.querySelectorAll(".nav-btn"); 

    switchButton.addEventListener("click", function () {
        headerButtons.forEach(button => {
            button.classList.toggle("hidden"); 
        });
    });
});
