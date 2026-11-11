class ApuestasService {
    constructor(repository) {
        this.repository = repository; // repositorio que vienedesde el main
    }

    async obtenerHistorial() {
        return await this.repository.obtener(); // todas las apuestas
    }

    async obtenerHistorialDeUsuario(usuarioId) {
        const historial = await this.repository.obtener(); // trae todas las apuestas
        return historial
            .filter(j => String(j.usuarioId) === String(usuarioId)) // deja solo las del usuario
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // ordena de la más nueva a la más antigua
    }

    async guardarApuesta(jugada, saldoDisponible) {
        if (!jugada) { // la jugada tiene que existir
            throw new Error('No se recibió la apuesta.');
        }
        if (!jugada.usuarioId) { // toda apuesta pertenece a un usuaio
            throw new Error('Debes iniciar sesión para apostar.');
        }
        if (typeof jugada.juego !== 'string' || jugada.juego.trim() === '') { // el juego es obligatorio
            throw new Error('Debes indicar el juego.');
        }

        const monto = Number(jugada.monto); // convierte a numero y lo que viene de un input es texto
        if (!Number.isFinite(monto) || monto <= 0) { // el monto debe ser mayor que cero
            throw new Error('El monto de la apuesta debe ser mayor a 0.');
        }
        if (saldoDisponible !== undefined && monto > saldoDisponible) { // no apostar mas que el saldo
            throw new Error('No tienes créditos suficientes para esta apuesta.');
        }

        return await this.repository.guardar({ ...jugada, monto }); // guarda la apuesta con el monto ya listo
    }

    simularResultado(monto) {  // 50 % de probabilidad de ganar si gana recibe el doble
        const gano = Math.random() < 0.5; // numero al azar entre 0 y 1
        return {
            resultado: gano ? 'ganada' : 'perdida', // resultado de la jugada
            ganancia: gano ? Number(monto) * 2 : 0 // creditos que recibe
        };
    }

    async eliminarApuesta(id) {
        await this.repository.eliminar(id); // elimina la apuesta con ese id
    }

    async actualizarNota(id, nota) {
        return await this.repository.actualizarNota(id, String(nota ?? '').trim()); // guarda la nota
    }

    calcularResumen(historial) {    // Calcula los totales que se muestran arriba del historial
        return historial.reduce((resumen, j) => {
            const monto = Number(j.monto) || 0; // lo apostado
            const ganancia = Number(j.ganancia) || 0; // lo ganado y 0 si perdio o esta pendiente
            resumen.totalApostado += monto; // suma todo lo apostado
            resumen.balanceNeto += ganancia - monto; // ganado menos apostado
            return resumen;
        }, { totalApostado: 0, balanceNeto: 0 }); // valores iniciales
    }
}