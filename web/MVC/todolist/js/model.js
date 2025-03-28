// Contador para asignar un id único a cada tarea
let idCounter = 0;

// Array para almacenar los objetos de las tareas
let tareas = [];

// Clase modelo
const Model = {
    //Función para obtener el array con los objetos
    obtenerTareas: function () {
        return tareas;
    },

    // Generar un nuevo objeto Tarea
    generarObj: function () {
        const tareaInput = document.querySelector("#tarea").value;
        const fecha = new Date().toISOString();
        return new Tarea(++idCounter, tareaInput, fecha);
    },

    // Función para guardar una tarea en el array
    guardarTarea: function (tarea) {
        tareas.push(tarea);
    },

    // Función para eliminar una tarea del array
    eliminarTarea: function (id) {
        tareas.forEach(t => {
            if (t.getId() === parseInt(id)) {
                t.setVisible(false);
            }
        });
    },

    // Función para cambiar el estado de una tarea
    cambiarEstado: function (id) {
        tareas.forEach(t => {
            if (t.getId() === parseInt(id)) {
                t.setEstado(!t.getEstado());
            }
        });
    }
};