class ApuestasController {
    constructor(apuestasService) {
        this.servicio = apuestasService; // guarda el servicio que le pasan para usarlo despues
        this.montoApuesta = 0; // inicia la variable del monto en cero
        this.juegoActual = 'Ruleta'; // define el juego actual para que el servicio no me tire error
        this.errorGeneral = ''; // deja el texto de error vacio para empezar
        this.mensajeExito = ''; // prepara un mensaje para confirmar que se guardo
    }

    async realizarApuesta() {
        this.errorGeneral = ''; // limpia cualquier error que me haya quedado de antes
        this.mensajeExito = ''; // limpia el mensaje de exito anterior por siacaso

        try {
            const jugada = { // arma el objeto con los datos exactos que me pide el servicio
                monto: this.montoApuesta, // le pasa el monto que aposto
                juego: this.juegoActual, // le indica el nombre del juego
                fecha: new Date().toISOString() // le suma la fecha exacta para el historial
            }; 

            await this.servicio.guardarApuesta(jugada); // llama a el servicio pasandole el objeto completo
            
            this.mensajeExito = '¡Apuesta registrada con éxito!'; // guarda el mensaje para mostrarlo en pantalla
            console.log("Apuesta enviada y guardada:", jugada); // imprima en consola para comprobar qua manda

        } catch (error) {
            this.errorGeneral = error.message; // atrapa el error del servicio y lo guarda para el html
        }
    }
}