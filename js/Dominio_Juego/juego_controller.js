// Profesor es el CONTROLADOR de la lista (Alpine.data), esto Traduce interacciones en órdenes al servicio
// y deja el resultado en el estad
function crearAdminJuegos(juegoService) {
    return {
        juegos: [],
        cargando: false,
        error: '',

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

        hayJuegos() {
            return !this.cargando && this.juegos.length > 0;
        },

        //  Eventos
        nuevo() {
            this.$dispatch('abrir-formulario', { juego: null });
        },

        editar(juego) {
            this.$dispatch('abrir-formulario', { juego });
        },

        // agrega o reemplaza el juego en la lista
        alGuardar(evento) {
            const juego = evento.detail.juego;
            const existe = this.juegos.some(j => j.id === juego.id);
            this.juegos = existe
                ? this.juegos.map(j => (j.id === juego.id ? juego : j))
                : [...this.juegos, juego];
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
        },

        // -Formato para la vista (así el HTML no lleva lógica) ---
        tieneImagen(j) {
            return Boolean(j.imagen);
        },

        textoDescripcion(j) {
            return j.descripcion || 'Sin datos';
        },

        textoTipo(j) {
            return j.tipo || 'Sin datos';
        },

        textoApuestas(j) {
            if (!j.apuestaMin || !j.apuestaMax) {
                return 'Sin datos';
            }
            return j.apuestaMin.toLocaleString('es-CL') + ' - ' +
                j.apuestaMax.toLocaleString('es-CL') + ' créditos';
        },

        textoEstado(j) {
            return j.estado === 'activo' ? 'Activo' : 'Inactivo';
        },

        claseEstado(j) {
            return j.estado === 'activo' ? 'EstadoActivo' : 'EstadoBloqueado';
        },

        textoBotonEstado(j) {
            return j.estado === 'activo' ? 'Desactivar' : 'Activar';
        },

        claseBotonEstado(j) {
            return j.estado === 'activo' ? 'BtnBloquear' : 'BtnDesbloquear';
        }
    };
}