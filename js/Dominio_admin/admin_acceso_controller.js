function crearAccesoAdmin(usuarioService) {
    return {
        autorizado: false,

        async verificar() {
            try {
                await usuarioService.obtenerSesionAdmin();
                this.autorizado = true;
            } catch (e) {
                window.location.href = 'Login.html';
            }
        }
    };
}