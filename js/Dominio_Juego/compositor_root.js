
document.addEventListener('alpine:init', () => {
    const repositorio = new LocalStorageJuegoRepository();
    const juegoService = new JuegoService(repositorio);

    Alpine.data('adminJuegos', () => crearAdminJuegos(juegoService));
    Alpine.data('formularioJuego', () => crearFormularioJuego(juegoService));
});