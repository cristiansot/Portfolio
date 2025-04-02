document.addEventListener("DOMContentLoaded", function () {
    const switchButton = document.querySelector(".content-switch");
    const headerButtons = document.querySelectorAll(".nav-btn"); // Selección de los botones de navegación en toda la página

    switchButton.addEventListener("click", function () {
        headerButtons.forEach(button => {
            button.classList.toggle("hidden"); // Alterna la clase "hidden" para todos los botones
        });
    });
});
