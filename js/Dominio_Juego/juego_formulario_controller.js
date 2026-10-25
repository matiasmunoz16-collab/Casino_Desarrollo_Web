
function crearFormularioJuego(juegoService) {
    return {
        visible: false,
        idEditando: null,
        nombre: '',
        tipo: 'Ruleta',
        descripcion: '',
        imagen: '',
        apuestaMin: null,
        apuestaMax: null,
        guardando: false,
        error: '',

        // Se ejecuta con el evento 'abrir-formulario'
        abrir(evento) {
            const juego = evento.detail.juego;
            this.limpiar();

            if (juego) {
                this.idEditando = juego.id;
                this.nombre = juego.nombre;
                this.tipo = juego.tipo ?? 'Ruleta';
                this.descripcion = juego.descripcion ?? '';
                this.imagen = juego.imagen ?? '';
                this.apuestaMin = juego.apuestaMin ?? null;
                this.apuestaMax = juego.apuestaMax ?? null;
            }

            this.visible = true;
            this.$nextTick(() => this.$root.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        },

        cerrar() {
            this.visible = false;
            this.limpiar();
        },

        limpiar() {
            this.idEditando = null;
            this.nombre = '';
            this.tipo = 'Ruleta';
            this.descripcion = '';
            this.imagen = '';
            this.apuestaMin = null;
            this.apuestaMax = null;
            this.mostrarError('');
            if (this.$refs.archivo) {
                this.$refs.archivo.value = '';
            }
        },

        // Lee el archivo elegido y lo deja como texto
        elegirImagen(evento) {
            const archivo = evento.target.files[0];
            if (!archivo) {
                return;
            }

            const lector = new FileReader();
            lector.onload = () => {
                this.imagen = lector.result;
            };
            lector.onerror = () => {
                this.mostrarError('No se pudo leer la imagen.');
            };
            lector.readAsDataURL(archivo);
        },

        quitarImagen() {
            this.imagen = '';
            if (this.$refs.archivo) {
                this.$refs.archivo.value = '';
            }
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

                const juego = this.idEditando
                    ? await juegoService.editar(this.idEditando, datos)
                    : await juegoService.crear(datos);

                this.$dispatch('juego-guardado', { juego });
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

        //para la vista
        titulo() {
            return this.idEditando ? 'Editar juego' : 'Nuevo juego';
        },

        textoBoton() {
            return this.guardando ? 'Guardando...' : 'Guardar juego';
        },

        tieneImagen() {
            return Boolean(this.imagen);
        }
    };
}