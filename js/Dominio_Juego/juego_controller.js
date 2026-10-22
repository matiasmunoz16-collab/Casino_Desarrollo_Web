
function crearAdminJuegos(juegoService) {
    return {
        juegos: [],
        cargando: false,
        error: '',
        nuevoNombre: '',

        async cargar() {
            this.mostrarCargando(true);
            try {
                this.juegos = await juegoService.listar();
                this.mostrarError('');
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
            return !this.cargando && !this.error && this.juegos.length === 0;
        }
    };
}