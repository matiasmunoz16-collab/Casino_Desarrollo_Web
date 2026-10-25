
// Recibe el repositorio por constructor (DIP). No lo construye ni nombra localStorage.
const TIPOS_JUEGO = ['Ruleta', 'Blackjack', 'Otro'];
const MAX_IMAGEN = 400000; // aprox. 290 KB)

class JuegoService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async listar() {
        return await this.repositorio.listar();
    }

    async crear(datos) {
        const juegos = await this.repositorio.listar();
        const limpio = this._validar(datos, juegos, null);

        const juego = { id: 'J' + Date.now(), ...limpio, estado: 'activo' };
        await this.repositorio.crear(juego);
        return juego;
    }

    async editar(id, datos) {
        const juegos = await this.repositorio.listar();
        const actual = juegos.find(j => j.id === id);
        if (!actual) {
            throw new Error('El juego no existe.');
        }

        const limpio = this._validar(datos, juegos, id);
        const juego = { ...actual, ...limpio };
        await this.repositorio.editar(juego);
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

    // Reglas de validación. Devuelve los datos ya limpios o lanza un Error.
    _validar(datos, juegos, idActual) {
        const nombre = (datos.nombre || '').trim();
        if (nombre.length < 2) {
            throw new Error('El nombre debe tener al menos 2 caracteres.');
        }
        if (nombre.length > 30) {
            throw new Error('El nombre no puede superar los 30 caracteres.');
        }

        const repetido = juegos.some(
            j => j.id !== idActual && j.nombre.toLowerCase() === nombre.toLowerCase()
        );
        if (repetido) {
            throw new Error('Ya existe un juego con ese nombre.');
        }

        if (!TIPOS_JUEGO.includes(datos.tipo)) {
            throw new Error('Selecciona un tipo de juego válido.');
        }

        const descripcion = (datos.descripcion || '').trim();
        if (descripcion.length > 200) {
            throw new Error('La descripción no puede superar los 200 caracteres.');
        }

        const min = Number(datos.apuestaMin);
        const max = Number(datos.apuestaMax);
        if (!Number.isInteger(min) || min < 1) {
            throw new Error('La apuesta mínima debe ser un número entero mayor que 0.');
        }
        if (!Number.isInteger(max) || max <= min) {
            throw new Error('La apuesta máxima debe ser un número entero mayor que la mínima.');
        }

        const imagen = datos.imagen || '';
        if (imagen && !imagen.startsWith('data:image/')) {
            throw new Error('El archivo seleccionado no es una imagen.');
        }
        if (imagen.length > MAX_IMAGEN) {
            throw new Error('La imagen es muy pesada. Usa una de menos de 290 KB.');
        }

        return { nombre, tipo: datos.tipo, descripcion, imagen, apuestaMin: min, apuestaMax: max };
    }
}