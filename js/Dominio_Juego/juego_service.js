
class JuegoService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async listar() {
        return await this.repositorio.listar();
    }

    async crear(nombre) {
        const limpio = (nombre || '').trim();

        if (limpio.length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres.');
        }

        const juegos = await this.repositorio.listar();
        const repetido = juegos.some(j => j.nombre.toLowerCase() === limpio.toLowerCase());
        if (repetido) {
            throw new Error('Ya existe un juego con ese nombre.');
        }

        const juego = { id: 'J' + Date.now(), nombre: limpio, estado: 'activo' };
        await this.repositorio.crear(juego);
        return juego;
    }

    async cambiarEstado(id) {
        const juegos = await this.repositorio.listar();
        const juego = juegos.find(j => j.id === id);
        if (!juego) {
            throw new Error('El juego no existe.');
        }

        juego.estado = juego.estado === 'activo' ? 'inactivo' : 'activo';
        await this.repositorio.editar(juego);
        return juego;
    }

    async eliminar(id) {
        await this.repositorio.eliminar(id);
    }
}