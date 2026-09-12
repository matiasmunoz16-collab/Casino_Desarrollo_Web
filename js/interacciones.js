document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#cuenta");

    if (formulario) {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault(); 
            
            // Captura los valores de los campos con los IDs exactos de tu HTML
            const nombre = document.querySelector("#nombre").value;
            const password = document.querySelector("#password").value;
            const confirmarPassword = document.querySelector("#confirmar").value; 
            
            // 1. Valida que el nombre no esté vacío
            if (nombre.trim() === "") {
                alert("Por favor, ingresa un nombre válido.");
                return; 
            }

            // 2. Valida que las contraseñas coincidan
            if (password !== confirmarPassword) {
                alert("Error: Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
                return; 
            }

            // 3. Mensaje de éxito si todo está correcto
            alert(`¡Bienvenido/a al casino, ${nombre}! Tu cuenta ha sido registrada correctamente.`);
            
        });
    }
});