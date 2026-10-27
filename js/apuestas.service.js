class ApuestasService {
    constructor(repository) {
        this.repository = repository;
    }

    async obtenerHistorial() {
        return await this.repository.obtener();
    }

    async guardarApuesta(jugada) {
        if (!jugada || !jugada.monto || !jugada.juego) {
            throw new Error('Faltan datos requeridos para registrar la apuesta.');
        }

        if (jugada.monto <= 0) {
            throw new Error('El monto de la apuesta debe ser mayor a 0.');
        }

        await this.repository.guardar(jugada);
    }

    async eliminarApuesta(id) {
        await this.repository.eliminar(id);
    }
}