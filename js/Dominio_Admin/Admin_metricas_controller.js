// x-data="adminMetricas").
function crearAdminMetricas(adminService) {
    return {
        metricas: null,
        cargando: false,
        error: '',

        async cargar() {
            this.mostrarError('');
            this.mostrarCargando(true);
            try {
                this.metricas = await adminService.obtenerMetricas();
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

        hayMetricas() {
            return !this.cargando && !this.error && this.metricas !== null;
        },

        // vista
        formatear(numero) {
            return Number(numero).toLocaleString('es-CL');
        },

        textoUsuarios() {
            return this.metricas ? this.formatear(this.metricas.usuariosRegistrados) : '';
        },

        textoPartidasHoy() {
            return this.metricas ? this.formatear(this.metricas.partidasHoy) : '';
        },

        textoMovimiento() {
            return this.metricas ? this.formatear(this.metricas.movimientoCreditos) + ' cr.' : '';
        }
    };
}