document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#cuenta");

    if (formulario) {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = document.querySelector("#nombre").value;

            if (nombre.trim() !== "") {
                alert(`¡Bienvenido/a al casino, ${nombre}!`);
            } else {
                alert("Por favor, ingresa un nombre válido.");
            }
        });
    }
});