const CLAVE_JUEGOS = 'casino.juegos';

class LocalStorageJuegoRepository extends JuegoRepository {
    async listar() {
        const datos = localStorage.getItem(CLAVE_JUEGOS);
        return datos ? JSON.parse(datos) : [];
    }

    async crear(juego) {
        const juegos = await this.listar();
        juegos.push(juego);
        this._guardar(juegos);
    }

    async editar(juego) {
        const juegos = await this.listar();
        this._guardar(juegos.map(j => (j.id === juego.id ? juego : j)));
    }

    async eliminar(id) {
        const juegos = await this.listar();
        this._guardar(juegos.filter(j => j.id !== id));
    }

    _guardar(juegos) {
        localStorage.setItem(CLAVE_JUEGOS, JSON.stringify(juegos));
    }
}