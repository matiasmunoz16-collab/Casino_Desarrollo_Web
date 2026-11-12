function crearApuestasController(servicio, obtenerSesion) {
    return {
        historial: [], // apuestas del usuario que se muestran en la tabla
        estado: 'cargando', // estado de la pantalla que muestra cargando normal vacio o error
        montoApuesta: '', // monto que escribe el jugador
        juegoActual: 'Ruleta', // juego en el que se apuesta
        errorGeneral: '', // mensaje cuando falla una cosa
        mensajeExito: '', // mensaje cuando la apuesta se guarda bien
        enviando: false, // no manda la misma apuesta dos veces

        async init() {
            await this.cargarHistorial(); // alpine lo ejecuta al crear el componente
        },

        get resumen() {
            return servicio.calcularResumen(this.historial); // total apostado y balance se recalcula solo
        },

        async cargarHistorial() {
            this.estado = 'cargando';
            try {
                const sesion = await obtenerSesion(); // usuario que inicio sesion o null
                if (!sesion) { // sin sesion no hay historial que mostrar
                    this.historial = [];
                    this.estado = 'vacio';
                    return;
                }
                this.historial = await servicio.obtenerHistorialDeUsuario(sesion.id); // solo sus apuestas
                this.estado = this.historial.length === 0 ? 'vacio' : 'normal'; // decide el estado segun la lista
            } catch (error) {
                this.estado = 'error';
                console.error('Error al cargar el historial:', error); // detalle tecnico para depurar
            }
        },

        // Los juegos llaman a este metodo con el resultado de la partida
        async realizarApuesta(resultado = 'pendiente', ganancia = 0) {
            this.errorGeneral = '';
            this.mensajeExito = '';
            this.enviando = true; // bloquea el boton mientras se guarda
            try {
                const sesion = await obtenerSesion();
                const jugada = {
                    usuarioId: sesion ? sesion.id : null, // la apuesta queda asociada al usuario
                    juego: this.juegoActual,
                    monto: this.montoApuesta,
                    resultado, // ganada, perdida o pendiente
                    ganancia, // creditos ganados en la jugada
                    fecha: new Date().toISOString() // fecha y hora exactas
                };
                await servicio.guardarApuesta(jugada, sesion ? sesion.creditos : undefined); // el servicio valida
                this.mensajeExito = '¡Apuesta registrada con éxito!';
                this.montoApuesta = ''; // limpia el campo
                await this.cargarHistorial(); // vuelve a leer para mostrar la apuesta nueva
            } catch (error) {
                this.errorGeneral = error.message; // muestra el mensaje del servicio
            } finally {
                this.enviando = false; // reactiva el boton pase lo que pase
            }
        },

        // el servicio decide el resultado y despues se registra la apuesta
        async apostar() {
            const { resultado, ganancia } = servicio.simularResultado(this.montoApuesta); // resultado de la jugada
            await this.realizarApuesta(resultado, ganancia); // registra la apuesta con ese resultado
        },

        async guardarNota(jugada) {
            this.errorGeneral = '';
            this.mensajeExito = '';
            try {
                await servicio.actualizarNota(jugada.id, jugada.nota); // guarda la nota escrita en la tabla
                this.mensajeExito = 'Nota guardada.';
                await this.cargarHistorial(); // vuelve a leer para mostrar lo guadado
            } catch (error) {
                this.errorGeneral = error.message;
            }
        },

        async eliminar(id) {
            this.errorGeneral = '';
            try {
                await servicio.eliminarApuesta(id);
                await this.cargarHistorial(); // actualiza la tabla
            } catch (error) {
                this.errorGeneral = error.message;
            }
        },

        formatearFecha(fechaIso) {
            return new Date(fechaIso).toLocaleString('es-CL'); // formato de fecha chileno
        },

        textoResultado(resultado) {
            const textos = { ganada: 'Ganada', perdida: 'Perdida' }; // texto para cada resultado
            return textos[resultado] || 'Pendiente';
        }
    };
}