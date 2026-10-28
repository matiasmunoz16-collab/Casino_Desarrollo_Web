const apuestasRepo = new LocalStorageApuestasRepository(); // repositorio de apuestas local
const apuestasService = new ApuestasService(apuestasRepo); // servicio de apuestas y le inyecto el repositorio
window.apuestasController = new ApuestasController(apuestasService); // controlador y lo dejo global para que alpine lo lea

const usuarioRepo = new LocalStorageUsuarioRepository(); // repositorio de usuarios
const usuarioService = new UsuarioService(usuarioRepo); // servicio de usuarios y le paso su repositorio
window.usuarioController = new UsuarioController(usuarioService); // el controlador de usuarios en window para usarlo en el Login