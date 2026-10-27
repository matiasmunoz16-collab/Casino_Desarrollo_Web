
function crearAdminJuegos(juegoService) {
    return {
        juegos: [],
        cargando: false,
        error: '',
        mostrandoLista: true,

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

        // Eventos hacia el formular
        nuevo() {
            this.mostrandoLista = false;
            this.$dispatch('abrir-formulario', { juego: null });
        },

        editar(juego) {
            this.mostrandoLista = false;
            this.$dispatch('abrir-formulario', { juego: juego });
        },

        // Eventos desde el formulario 
        alCerrarFormulario() {
            this.mostrandoLista = true;
        },

        alGuardar(evento) {
            const juego = evento.detail.juego;
            const existe = this.juegos.some(j => j.id === juego.id);
            if (existe) {
                this.juegos = this.juegos.map(j => (j.id === juego.id ? juego : j));
            } else {
                this.juegos.push(juego);
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
        },

        //  Formato para la vista (así el HTML no lleva lógica
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
            return j.apuestaMin + ' - ' + j.apuestaMax + ' créditos';
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