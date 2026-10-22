export class UsuarioService {
    constructor(repo){
        this.repo = repo;
    }

    async obtenerRanking() {
        const usuarios = await this.repo.listar();
        return [...usuarios].sort((a, b) => b.creditos - a.creditos);
    }

    async obtenerSesionActual() {
        return await this.repo.obtenerSesion();
    }

    async registrar(datos) {
            const nombre = datos.nombre ? datos.nombre.trim() : '';
            const email = datos.email ? datos.email.trim() : '';
            const password = datos.password || '';
            const confirmar = datos.confirmar || '';
    }
}