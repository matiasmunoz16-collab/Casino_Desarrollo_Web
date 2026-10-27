class ApuestasController {
    constructor(apuestasService) {
        this.servicio = apuestasService; // guardo el servicio que me pasan para usarlo después
        this.montoApuesta = 0; // inicializo mi variable del monto en cero
        this.juegoActual = 'Ruleta'; // defino el juego actual para que el servicio no me tire error
        this.errorGeneral = ''; // dejo el texto de error vacío para empezar
        this.mensajeExito = ''; // prepa
        // ro un mensaje para confirmar que se guardo
    }

    async realizarApuesta() {
        this.errorGeneral = ''; // limpio cualquier error que me haya quedado de antes
        this.mensajeExito = ''; // limpio el mensaje de exito anterior por si acaso

        try {
            const jugada = { // armo el objeto con los datos exactos que me pide el servicio
                monto: this.montoApuesta, // le paso el monto que aposte
                juego: this.juegoActual, // le indico el nombre del juego
                fecha: new Date().toISOString() // le sumo la fecha exacta para el historial
            }; 

            await this.servicio.guardarApuesta(jugada); // llamo a mi servicio pasandole el objeto completo
            
            this.mensajeExito = '¡Apuesta registrada con éxito!'; // guardo el mensaje para mostrarlo en pantalla
            console.log("Apuesta enviada y guardada:", jugada); // imprimo en consola para comprobar qua manda

        } catch (error) {
            this.errorGeneral = error.message; // atrapo el error de tu servicio y lo guardo para el HTML
        }
    }
}