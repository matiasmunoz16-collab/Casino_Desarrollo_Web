if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registrado:', reg.scope))
            .catch(err => console.warn('Error SW:', err));
    });
}

const apuestasRepo = new LocalStorageApuestasRepository();
const apuestasService = new ApuestasService(apuestasRepo);
window.apuestasController = new ApuestasController(apuestasService);

const usuarioRepo = new LocalStorageUsuarioRepository();
window.usuarioService = new UsuarioService(usuarioRepo);

window.usuarioRepositorio = usuarioRepo;
window.apuestasRepositorio = apuestasRepo;

document.addEventListener('alpine:init', () => {
    if (typeof LocalStorageJuegoRepository !== 'undefined') {
        const juegoRepo = new LocalStorageJuegoRepository();
        const juegoService = new JuegoService(juegoRepo);
        Alpine.data('adminJuegos', () => crearAdminJuegos(juegoService));
        Alpine.data('formularioJuego', () => crearFormularioJuego(juegoService));
    }

    if (typeof AdminService !== 'undefined') {
        const adminService = new AdminService(usuarioRepo, apuestasRepo);
        Alpine.data('adminMetricas', () => crearAdminMetricas(adminService));
        Alpine.data('adminMovimientos', () => crearAdminMovimientos(adminService));
        Alpine.data('adminUsuarios', () => crearAdminUsuarios(adminService));
    }
});