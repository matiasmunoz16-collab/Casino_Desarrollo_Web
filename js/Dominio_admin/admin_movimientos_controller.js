
function crearAdminMovimientos(adminService) {
    return {
        movimientos: [],
        cargando: false,
        error: '',

        async cargar() {
            this.mostrarError('');
            this.mostrarCargando(true);
            try {
                this.movimientos = await adminService.obtenerMovimientos();
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
            return !this.cargando && !this.error && this.movimientos.length === 0;
        },

        hayMovimientos() {
            return !this.cargando && !this.error && this.movimientos.length > 0;
        },

        // Formato para la vista 
        textoPartida(m) {
            const fecha = new Date(m.fecha);
            if (isNaN(fecha.getTime())) {
                return m.juego;
            }
            const corta = fecha.toLocaleString('es-CL', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
            });
            return m.juego + ' · ' + corta;
        },

        textoApuesta(m) {
            return m.monto.toLocaleString('es-CL') + ' cr.';
        },

        textoResultado(m) {
            if (m.resultado === 'pendiente') {
                return 'Pendiente';
            }
            const signo = m.ganancia > 0 ? '+' : '';
            return signo + m.ganancia.toLocaleString('es-CL') + ' cr.';
        },

        claseResultado(m) {
            if (m.resultado === 'ganada') return 'EstadoActivo';
            if (m.resultado === 'perdida') return 'EstadoBloqueado';
            return '';
        }
    };
}
