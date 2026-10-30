class UsuarioService {
    constructor(repo){
        this.repo = repo;
    }

    async obtenerRanking() {
        const usuarios = await this.repo.listar();
        const jugadores = usuarios.filter(u => u.id !== 'admin');
        return jugadores.sort((a, b) => b.creditos - a.creditos);
    }

    async obtenerSesionAdmin() {
        const sesion = await this.repo.obtenerSesion();
        if (!sesion || sesion.id !== 'admin') {
            throw new Error('Acceso solo para el administrador.');
        }
        return sesion;
    }

    async obtenerSesionActual() {
        return await this.repo.obtenerSesion();
    }

    async registrar(datos) {
            const nombre = datos.nombre ? datos.nombre.trim() : '';
            const email = datos.email ? datos.email.trim() : '';
            const password = datos.password || '';
            const confirmar = datos.confirmar || '';

            if (nombre.length < 3) {
                throw new Error('El nombre debe tener al menos 3 caracteres.');
            }
            if (!email.includes('@')){
                throw new Error('Ingresa un correo valido.');
            }
            if (password.length < 5) {
                throw new Error('La contraseña debe tener al menos 5 caracteres.');
            }
            if (password !== confirmar) {
                throw new Error('Las contraseñas no coinciden.');
            }

            const lista = await this.repo.listar();
            const repetido = lista.some(
                u => u.nombre.toLowerCase() === nombre.toLowerCase() || u.email.toLowerCase() === email.toLowerCase()
            );

            if (repetido) {
                throw new Error('Ese nombre de usuario o correo ya esta registrado.');
            }

            const nuevoUsuario = {
                id: 'u_' + Date.now(),
                nombre: nombre,
                email: email,
                password: password,
                creditos: 0,
                bonoReclamado: false
            };

            await this.repo.crear(nuevoUsuario);
            await this.repo.guardarSesion(nuevoUsuario);
            return nuevoUsuario;
    }

    async iniciarSesion(identificador, password) {
        if(!identificador || !password) {
            throw new Error('Ingresa tus datos para entrar')
        }

        const texto = identificador.trim().toLowerCase();
        const lista = await this.repo.listar();
        const encontrado = lista.find(
            u => (u.nombre.toLowerCase() === texto || u.email.toLowerCase() === texto) && u.password === password
        );

        if (!encontrado) {
            throw new Error('Usuario o contraseña incorrectos.');
        }

        await this.repo.guardarSesion(encontrado);
        return encontrado;
    }

    async reclamarBono() {
        const sesion = await this.repo.obtenerSesion();
        if (!sesion) {
            throw new Error('Debes iniciar sesion para reclamar tus creditos.');
        }
        if (sesion.bonoReclamado) {
            throw new Error('Ya reclamaste tu bono de bienvendia.');
        }

        sesion.creditos += 1000;
        sesion.bonoReclamado = true;

        await this.repo.editar(sesion);
        await this.repo.guardarSesion(sesion);
        return sesion;
    }

    async editarPerfil(id, nuevosDatos) {
        const nombre = nuevosDatos.nombre ? nuevosDatos.nombre.trim() : '';
        if (nombre.length < 3) {
            throw new Error('El nombre debe tener al menos 3 caracteres.');
        }

        const lista = await this.repo.listar();
        const usuario = lista.find(u => u.id === id);
        if (!usuario) {
            throw new Error('Usuario no encontrado.');
        }

        usuario.nombre = nombre;
        if(nuevosDatos.email && nuevosDatos.email.includes('@')) {
            usuario.email = nuevosDatos.email.trim();
        }

        await this.repo.editar(usuario);
        await this.repo.guardarSesion(usuario);
        return usuario;
    }

    async eliminarCuenta(id) {
        await this.repo.eliminar(id);
        await this.repo.cerrarSesion();
        return true;
    }

    async cerrarSesion() {
        return await this.repo.cerrarSesion();
    }
}