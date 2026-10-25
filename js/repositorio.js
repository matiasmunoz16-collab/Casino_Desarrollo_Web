class ApuestasRepository {
    async obtener() { throw new Error('No implementado'); }
    async guardar(jugada) { throw new Error('No implementado'); }
    async eliminar(id) { throw new Error('No implementado'); }
    async actualizarNota(id, nota) { throw new Error('No implementado'); }
}

class LocalStorageApuestasRepository extends ApuestasRepository {
    async obtener() {
        const data = localStorage.getItem('historial_apuestas');
        return data ? JSON.parse(data) : [];
    }

    async guardar(jugada) {
        const historial = await this.obtener();
        historial.push(jugada);
        localStorage.setItem('historial_apuestas', JSON.stringify(historial));
    }
}