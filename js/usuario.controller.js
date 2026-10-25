import { LocalStorageUsuarioRepository } from "./usuario.repository.js";
import { UsuarioService } from "./usuario.service.js";

const repositorioDeUsuarios = new LocalStorageUsuarioRepository();
const usuarioService = new UsuarioService(repositorioDeUsuarios);

document.addEventListener('alpine:init', () => {
    Alpine.data('usuarioController', () => ({
        sesionActiva: null,
        ranking: [],
        errorGeneral: '',
        mensajeExito: '',
        datosRegistro: {nombre: '', email: '' , password: '', confirmar: '' },
        datosLogin: {identificador: '', password: '' },

        async init(){
            await this.cargarSesion();
        },
        
        async cargarSesion() {
            this.sesionActiva = await usuarioService.obtenerSesionActual();
        },

        async cargarRanking() {
            this.ranking = await usuarioService.obtenerRanking();
        },

        async registrarse() {
            this.errorGeneral = '';
            try {
                await usuarioService.registrar(this.datosRegistro);
                window.location.href = 'index.html';
            } catch (error) {
                this.errorGeneral = error.message;
            }
        },

        async iniciarSesion() {
            this.errorGeneral = '';
            try {
                await usuarioService.iniciarSesion(this.datosLogin.identificador, this.datosLogin.password);
                
                if (this.datosLogin.identificador.toLowerCase() === 'admin' || this.datosLogin.identificador === 'admin@casino.cl') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            } catch (error) {
                this.errorGeneral = error.message;
            }
        },

        async reclamarBonoBienvenida() {
            this.errorGeneral = '';
            this.mensajeExito = '';
            try {
                this.sesionActiva = await usuarioService.reclamarBono();
                this.mensajeExito = '¡$1.000 creditos añadidos a tu cuenta!';
            } catch (error) {
                this.errorGeneral = error.message;
            }
        },

        async salir() {
            await usuarioService.cerrarSesion();
            this.sesionActiva = null;
            window.location.href = 'index.html';
        }
    }));
});
