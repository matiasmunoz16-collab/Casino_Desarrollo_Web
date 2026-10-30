
function crearAdminUsuarios(adminService) {
    return {
        usuarios: [],
        cargando: false,
        error: '',

        async cargar() {
            this.mostrarError('');
            this.mostrarCargando(true);
            try {
                this.usuarios = await adminService.obtenerUsuarios();
            } catch (e) {
                this.mostrarError(e.message);
            } finally {
                this.mostrarCargando(false);
            }
        },

        mostrarCargando(valor) {
            this.cargando = valor;
        },

        mostrarError(mensaje) {
            this.error = mensaje;
        },

        listaVacia() {
            return !this.cargando && !this.error && this.usuarios.length === 0;
        },

        hayUsuarios() {
            return !this.cargando && !this.error && this.usuarios.length > 0;
        }
    };
}
