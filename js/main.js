const apuestasRepo = new LocalStorageApuestasRepository(); // instancie el repositorio de apuestas local
const apuestasService = new ApuestasService(apuestasRepo); // creo el servicio de apuestas y le inyecto el repositorio
window.apuestasController = new ApuestasController(apuestasService); // instancie el controlador y lo dejo global para que Alpine lo lea

const usuarioRepo = new LocalStorageUsuarioRepository(); // instancie el repositorio de usuarios
const usuarioService = new UsuarioService(usuarioRepo); // cree el servicio de usuarios y le paso su repositorio
window.usuarioController = new UsuarioController(usuarioService); // el controlador de usuarios en window para usarlo en el Login