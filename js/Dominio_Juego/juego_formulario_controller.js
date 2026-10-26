
function crearFormularioJuego(juegoService) {
    return {
        visible: false,
        idEditando: null,
        nombre: '',
        tipo: 'Ruleta',
        descripcion: '',
        imagen: '',
        apuestaMin: '',
        apuestaMax: '',
        guardando: false,
        error: '',

        // Se ejecuta con el evento abrir-formulario
        abrir(evento) {
            const juego = evento.detail.juego;
            this.limpiar();

            if (juego) {
                this.idEditando = juego.id;
                this.nombre = juego.nombre;
                this.tipo = juego.tipo || 'Ruleta';
                this.descripcion = juego.descripcion || '';
                this.imagen = juego.imagen || '';
                this.apuestaMin = juego.apuestaMin || '';
                this.apuestaMax = juego.apuestaMax || '';
            }

            this.visible = true;
        },

        cerrar() {
            this.visible = false;
            this.limpiar();
            this.$dispatch('formulario-cerrado');
        },

        limpiar() {
            this.idEditando = null;
            this.nombre = '';
            this.tipo = 'Ruleta';
            this.descripcion = '';
            this.imagen = '';
            this.apuestaMin = '';
            this.apuestaMax = '';
            this.mostrarError('');
        },

        async guardar() {
            this.mostrarError('');
            this.mostrarCargando(true);
            try {
                const datos = {
                    nombre: this.nombre,
                    tipo: this.tipo,
                    descripcion: this.descripcion,
                    imagen: this.imagen,
                    apuestaMin: this.apuestaMin,
                    apuestaMax: this.apuestaMax
                };

                let juego;
                if (this.idEditando) {
                    juego = await juegoService.editar(this.idEditando, datos);
                } else {
                    juego = await juegoService.crear(datos);
                }

                this.$dispatch('juego-guardado', { juego: juego });
                this.cerrar();
            } catch (e) {
                this.mostrarError(e.message);
            } finally {
                this.mostrarCargando(false);
            }
        },

        mostrarCargando(valor) {
            this.guardando = valor;
        },

        mostrarError(mensaje) {
            this.error = mensaje;
        },

        // --- Textos para la vista ---
        titulo() {
            return this.idEditando ? 'Editar juego' : 'Nuevo juego';
        },

        textoBoton() {
            return this.guardando ? 'Guardando...' : 'Guardar juego';
        }
    };
}