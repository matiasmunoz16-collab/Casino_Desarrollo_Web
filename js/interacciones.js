document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("#cuenta");

    if (formulario) {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();

            // Captura los valores
            const nombre = document.querySelector("#nombre").value;
            const password = document.querySelector("#password").value;
            const confirmarPassword = document.querySelector("#confirmar").value;

            // Captura los contenedores de error del HTML
            const errorNombre = document.querySelector("#errorNombre");
            const errorConfirmar = document.querySelector("#errorConfirmar");

            // Limpia los errores de intentos anteriores
            if (errorNombre) errorNombre.textContent = "";
            if (errorConfirmar) errorConfirmar.textContent = "";

            let hayError = false;

            // Valida que el nombre no esté vacío
            if (nombre.trim() === "") {
                if (errorNombre) errorNombre.textContent = "Por favor, ingresa un nombre válido.";
                hayError = true;
            }

            // Valida que las contraseñas coincidan
            if (password !== confirmarPassword) {
                if (errorConfirmar) errorConfirmar.textContent = "Las contraseñas no coinciden. Inténtalo de nuevo.";
                hayError = true;
            }

            // Modifica la estructura si todo está correcto
            if (!hayError) {
                // Reemplaza todo el formulario por un mensaje de éxito y un botón para ir al inicio
                formulario.innerHTML = `
                    <h2 style="color: #d4af37; text-align: center;">¡Bienvenido/a, ${nombre}!</h2>
                    <p style="color: #ffffff; text-align: center;">Tu cuenta en Casino Delfines está lista.</p>
                    <br>
                    <div style="text-align: center;">
                        <a href="index.html" style="background-color: #1e293b; color: #ffffff; text-decoration: none; padding: 10px 20px; border: 1px solid #d4af37; border-radius: 6px; font-weight: bold; display: inline-block;">Ir a los Juegos</a>
                    </div>
                `;
            }
        });
    }
});