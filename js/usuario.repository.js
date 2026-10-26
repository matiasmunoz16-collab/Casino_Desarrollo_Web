class UsuarioRepository {
    async listar() { throw new Error('No implementado'); }
    async crear(usuario) { throw new Error('No implementado'); }
    async editar(usuario) { throw new Error('No implementado'); }
    async eliminar(id) { throw new Error('No implementado'); }
    async obtenerSesion() { throw new Error('No implementado'); }
    async guardarSesion(usuario) { throw new Error('No implementado'); }
    async cerrarSesion() { throw new Error('No implementado'); }
}

class LocalStorageUsuarioRepository extends UsuarioRepository {
    constructor(){
        super ();
        this.claveUsuarios = 'casino_delfines_usuarios';
        this.claveSesion = 'casino_delfines_sesion';
    }

    async listar() {
        const datos = localStorage.getItem(this.claveUsuarios);
        if(!datos) {
            const iniciales = [
                { id: 'u1', nombre: 'DelfinMaestro', email: 'maestro@delfines.cl', password: '12345', creditos: 50250, bonoReclamado: true },
                { id: 'u2',nombre: 'CarlosPro99', email: 'carlos@delfines.cl', password: '12345', creditos: 42100, bonoReclamado: true }
            ];
            localStorage.setItem(this.claveUsuarios, JSON.stringify(iniciales));
            return iniciales;
        }
        return JSON.parse(datos);
    }

    async crear(usuario) {
         const usuarios = await this.listar();
        usuarios.push(usuario);
        localStorage.setItem(this.claveUsuarios, JSON.stringify(usuarios));
        return usuario;
    }

    async editar(usuarioActualizado) {
        const usuarios = await this.listar();
        const index = usuarios.findIndex(u => u.id === usuarioActualizado.id);
        if (index === -1) throw new Error('Usuario no encontrado');
        usuarios[index] = usuarioActualizado;
        localStorage.setItem(this.claveUsuarios, JSON.stringify(usuarios));
        return usuarioActualizado;
    }

    async eliminar(id) {
        const usuarios = await this.listar();
        const filtrados = usuarios.filter(u => u.id !== id);
        localStorage.setItem(this.claveUsuarios, JSON.stringify(filtrados));
        return true;
    }

    async obtenerSesion() {
        const sesion = localStorage.getItem(this.claveSesion);
        return sesion ? JSON.parse(sesion) : null; 
    }

    async guardarSesion(usuario) {
        localStorage.setItem(this.claveSesion, JSON.stringify(usuario));
        return usuario;
    }

    async cerrarSesion() {
        localStorage.removeItem(this.claveSesion);
        return true;
    }
}