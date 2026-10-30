class ApuestasRepository { 
    async obtener() { throw new Error('No implementado'); } // metodo para obtener datos que obliga a ser implementado en las clases hijas
    async guardar(jugada) { throw new Error('No implementado'); } // metodo para guardar que lanzara error si no lo sobreescribe
    async eliminar(id) { throw new Error('No implementado'); } // base del metodo para eliminar una apuesta por su ID
    async actualizarNota(id, nota) { throw new Error('No implementado'); } // metodo base para actualizar la nota de una jugada
} 

class LocalStorageApuestasRepository extends ApuestasRepository { // clase que hereda de la base para guardar en localStorage
    async obtener() { // metodo para traer el historial de apuestas
        const data = localStorage.getItem('historial_apuestas'); // busca y guarda en una variable lo que tiene almacenada en el navegador bajo esa clave
        return data ? JSON.parse(data) : []; // si encuentra datos los transforma a un objeto js, si no, devuelve un arreglo vacío
    }

    async guardar(jugada) { // metodo para registrar una nueva jugada
        const historial = await this.obtener(); // trae todo el historial que ya tengo guardado usando el metodo anterior
        historial.push(jugada); // agrega la nueva jugada al final de el arreglo del historial
        localStorage.setItem('historial_apuestas', JSON.stringify(historial)); // convierte el historial actualizado a texto y lo guarda de vuelta en el navegador
    }

    async eliminar(id) { // metodo para borrar una apuesta especifica usando su id
        let historial = await this.obtener(); // recupera el historial actual completo
        historial = historial.filter(j => j.id !== id); // filtra el arreglo para quedarse solo con las jugadas que no coincidan con el ID que quiere borrar
        localStorage.setItem('historial_apuestas', JSON.stringify(historial)); // guarda este nuevo historial filtrado en el localStorage
    } 

    async actualizarNota(id, nota) { // metodo para cambiarle la nota a una apuesta que ya existe
        let historial = await this.obtener(); // vuelve a cargar todo el historial
        const index = historial.findIndex(j => j.id === id); // busca la posicion exacta en el arreglo donde esta la apuesta con ese ID
        if (index !== -1) { // verifica si realmente encontra la apuesta
            historial[index].nota = nota; // le asigna la nueva nota a la apuesta en esa posicion especifica
            localStorage.setItem('historial_apuestas', JSON.stringify(historial)); // guarda los cambios actualizados en el localStorage
        } 
    } 
} 