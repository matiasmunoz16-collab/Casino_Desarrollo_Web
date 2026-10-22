
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
        },

        async crear() {
            this.mostrarError('');
            try {
                const juego = await juegoService.crear(this.nuevoNombre);
                this.juegos.push(juego);
                this.nuevoNombre = '';
            } catch (e) {
                this.mostrarError(e.message);
            }
        },

        async alternarEstado(id) {
            this.mostrarError('');
            try {
                const actualizado = await juegoService.cambiarEstado(id);
                this.juegos = this.juegos.map(j => (j.id === id ? actualizado : j));
            } catch (e) {
                this.mostrarError(e.message);
            }
        },

        async eliminar(id) {
            this.mostrarError('');
            try {
                await juegoService.eliminar(id);
                this.juegos = this.juegos.filter(j => j.id !== id);
            } catch (e) {
                this.mostrarError(e.message);
            }
        }
        
    
    };
}