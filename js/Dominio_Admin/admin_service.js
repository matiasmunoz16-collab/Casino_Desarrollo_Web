// cada apuesta guardada por los juegos:
//   { id, usuarioId, juego, monto, resultado: 'ganada' | 'perdida', ganancia (opcional), fecha (ISO) }

class AdminService {
    constructor(usuarioRepositorio, apuestasRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.apuestasRepositorio = apuestasRepositorio;
    }

    async obtenerMetricas() {
        const { usuarios, apuestas } = await this._leerDatos();

        return {
            usuariosRegistrados: usuarios.length,
            partidasHoy: apuestas.filter(a => this._esDeHoy(a.fecha)).length,
            movimientoCreditos: apuestas.reduce((total, a) => total + this._monto(a), 0)
        };
    }

    async obtenerUsuarios() {
        const { usuarios, apuestas } = await this._leerDatos();

        return usuarios
            .map(u => {
                const propias = apuestas.filter(a => a.usuarioId === u.id);
                return {
                    id: u.id,
                    nombre: u.nombre,
                    jugadas: propias.length,
                    ganadas: propias.filter(a => this._resultado(a) === 'ganada').length,
                    perdidas: propias.filter(a => this._resultado(a) === 'perdida').length
                };
            })
            .sort((a, b) => b.jugadas - a.jugadas || a.nombre.localeCompare(b.nombre));
    }

    async obtenerMovimientos(limite = 10) {
        const { usuarios, apuestas } = await this._leerDatos();

        const nombres = {};
        usuarios.forEach(u => { nombres[u.id] = u.nombre; });

        return [...apuestas]
            .sort((a, b) => this._tiempo(b.fecha) - this._tiempo(a.fecha))
            .slice(0, limite)
            .map(a => ({
                id: a.id,
                usuario: nombres[a.usuarioId] || 'Sin usuario',
                juego: a.juego || 'Sin datos',
                monto: this._monto(a),
                resultado: this._resultado(a),
                ganancia: this._ganancia(a),
                fecha: a.fecha
            }));
    }

    // Regla internas
    async _leerDatos() {
        try {
            const usuarios = await this.usuarioRepositorio.listar();
            const apuestas = await this.apuestasRepositorio.obtener();
            return { usuarios, apuestas };
        } catch (e) {
            throw new Error('No se pudieron leer los datos del casino.');
        }
    }

    _monto(apuesta) {
        const monto = Number(apuesta.monto);
        return isNaN(monto) ? 0 : monto;
    }

    _resultado(apuesta) {
        const resultado = String(apuesta.resultado || '').toLowerCase();
        return resultado === 'ganada' || resultado === 'perdida' ? resultado : 'pendiente';
    }

    _ganancia(apuesta) {
        if (typeof apuesta.ganancia === 'number') {
            return apuesta.ganancia;
        }
        const resultado = this._resultado(apuesta);
        if (resultado === 'ganada') return this._monto(apuesta);
        if (resultado === 'perdida') return -this._monto(apuesta);
        return 0;
    }

    _tiempo(fecha) {
        const tiempo = new Date(fecha).getTime();
        return isNaN(tiempo) ? 0 : tiempo;
    }

    _esDeHoy(fecha) {
        const tiempo = this._tiempo(fecha);
        return tiempo !== 0 && new Date(tiempo).toDateString() === new Date().toDateString();
    }
}