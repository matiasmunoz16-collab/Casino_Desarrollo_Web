
class ApuestasRepository {
    async obtener() { throw new Error('No implementado'); } // devuelve todas las apuestas
    async guardar(jugada) { throw new Error('No implementado'); } // guarda una apuesta y la devuelve con su id
    async eliminar(id) { throw new Error('No implementado'); } // elimina la apuesta con ese id
    async actualizarNota(id, nota) { throw new Error('No implementado'); } // cambia la nota de una apuesta
}

class LocalStorageApuestasRepository extends ApuestasRepository {
    constructor() {
        super(); // se usa antes de usar this en una clase hija
        this.clave = 'historial_apuestas'; // guarda las apuestas en el navegador
    }

    async obtener() {
        const datos = localStorage.getItem(this.clave); // lee el texto guardado
        return datos ? JSON.parse(datos) : []; // convierte el texto enarreglo
    }

    async guardar(jugada) {
        const historial = await this.obtener(); // trae las apuestas que ya existen
        const nueva = { ...jugada, id: Date.now() }; // copia la jugada y le da un id unico
        historial.push(nueva); // la agrega al final
        localStorage.setItem(this.clave, JSON.stringify(historial)); // guarda el arreglo actualizado como texto
        return nueva; //devuelve la apuesta con su id
    }

    async eliminar(id) {
        const historial = await this.obtener(); // trae las apuestas actuales
        const restantes = historial.filter(j => String(j.id) !== String(id)); // deja todas menos el id indicado
        localStorage.setItem(this.clave, JSON.stringify(restantes)); // guarda el resultado
    }

    async actualizarNota(id, nota) {
        const historial = await this.obtener(); // trae las apuestas actuales
        const indice = historial.findIndex(j => String(j.id) === String(id)); // busca la posicion de la apuesta
        if (indice === -1) { // si no existe pone un error
            throw new Error('No se encontró la apuesta.');
        }
        historial[indice].nota = nota; // cambia la nota
        localStorage.setItem(this.clave, JSON.stringify(historial)); // guarda el cambio
        return historial[indice]; // devuelve la apuesta actualizada
    }
}