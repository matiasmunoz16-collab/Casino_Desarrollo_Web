
class JuegoService {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }

    async listar() {
        return await this.repositorio.listar();
    }

    async crear(datos) {
        const juegos = await this.repositorio.listar();
        this._validar(datos, juegos, null);

        const juego = {
            id: 'J' + Date.now(),
            nombre: datos.nombre.trim(),
            tipo: datos.tipo,
            descripcion: (datos.descripcion || '').trim(),
            imagen: datos.imagen || '',
            apuestaMin: Number(datos.apuestaMin),
            apuestaMax: Number(datos.apuestaMax),
            estado: 'activo'
        };

        await this.repositorio.crear(juego);
        return juego;
    }

    async editar(id, datos) {
        const juegos = await this.repositorio.listar();
        const juego = juegos.find(j => j.id === id);
        if (!juego) {
            throw new Error('El juego no existe.');
        }

        this._validar(datos, juegos, id);

        juego.nombre = datos.nombre.trim();
        juego.tipo = datos.tipo;
        juego.descripcion = (datos.descripcion || '').trim();
        juego.imagen = datos.imagen || '';
        juego.apuestaMin = Number(datos.apuestaMin);
        juego.apuestaMax = Number(datos.apuestaMax);

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

    // Reglas de validación. Lanza un Error si algo no cumple.
    // idActual es el id del juego que se edita (null si es nuevo),
    // para no marcar como repetido el nombre del propio juego.
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

        if (datos.tipo !== 'Ruleta' && datos.tipo !== 'Blackjack' && datos.tipo !== 'Otro') {
            throw new Error('Selecciona un tipo de juego válido.');
        }

        if ((datos.descripcion || '').trim().length > 200) {
            throw new Error('La descripción no puede superar los 200 caracteres.');
        }

        const min = Number(datos.apuestaMin);
        const max = Number(datos.apuestaMax);
        if (isNaN(min) || min <= 0) {
            throw new Error('La apuesta mínima debe ser un número mayor que 0.');
        }
        if (isNaN(max) || max <= min) {
            throw new Error('La apuesta máxima debe ser un número mayor que la mínima.');
        }

        // La imagen llega como texto "data:image/..." (viene del archivo subido).
        const imagen = datos.imagen || '';
        if (imagen !== '' && imagen.indexOf('data:image/') !== 0) {
            throw new Error('El archivo seleccionado no es una imagen.');
        }
        if (imagen.length > 400000) { // aprox. 290 KB
            throw new Error('La imagen es muy pesada. Usa una de menos de 290 KB.');
        }
    }
}