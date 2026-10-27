const apuestasRepo = new LocalStorageApuestasRepository();
window.apuestasService = new ApuestasService(apuestasRepo);

const usuarioRepo = new LocalStorageUsuarioRepository();
window.usuarioService = new UsuarioService(usuarioRepo);