export class UsuarioRepository {
    async listar() { throw new Error('No implementado'); }
    async crear(usuario) { throw new Error('No implementado'); }
    async editar(usuario) { throw new Error('No implementado'); }
    async eliminar(id) { throw new Error('No implementado'); }
    async obtenerSesion() { throw new Error('No implementado'); }
    async guardarSesion(usuario) { throw new Error('No implementado'); }
    async cerrarSesion() { throw new Error('No implementado'); }
}

export class LocalStorageUsuarioRepository extends UsuarioRepository {
    constructor(){
        super ();
        this.claveUsuarios = 'casino_delfines_usuarios';
        this.claveSesion = 'casino_delfines_sesion';
    }
}

