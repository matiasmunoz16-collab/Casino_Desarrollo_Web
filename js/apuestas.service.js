class ApuestasService { // clase para el servicio de apuestas
    constructor(repository) { // constructor que recibe el repositorio que le pasa
        this.repository = repository; // guarda el repositorio en una variable de la clase para usarlo despues
    }

    async obtenerHistorial() { // metodo para traer todo el historial de jugadas
        return await this.repository.obtener(); // llama al metodo obtener de el repositorio y devuelve esos datos
    }

    async guardarApuesta(jugada) { // metodo para registrar una nueva apuesta
        if (!jugada || !jugada.monto || !jugada.juego) { // verifica que la jugada exista y que traiga el monto y el juego
            throw new Error('Faltan datos requeridos para registrar la apuesta.'); // lanza un error si le falta algun dato importante
        }

        if (jugada.monto <= 0) { // revisa que el monto que quiero apostar no sea cero ni negativo
            throw new Error('El monto de la apuesta debe ser mayor a 0.'); // tira un error si el monto esta mal
        }

        await this.repository.guardar(jugada); // le pasa la jugada a el repositorio para que la guarde
    }

    async eliminarApuesta(id) { // metodo para borrar una apuesta usando su id
        await this.repository.eliminar(id); // llama al repositorio para que elimine la apuesta con ese id especifico
    } 
} 