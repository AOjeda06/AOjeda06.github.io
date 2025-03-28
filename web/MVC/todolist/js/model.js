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
        const tareaInputElement = document.querySelector("#todo-input"); // Cambiado de "#tarea" a "#todo-input"
        if (!tareaInputElement) {
            throw new Error("El elemento con id 'todo-input' no existe en el DOM. Asegúrate de que el DOM esté completamente cargado y que el elemento exista.");
        }
        const tareaInput = tareaInputElement.value;
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
        // Comprobar que la tarea permanece en el array
        console.log("Estado actual del array de tareas:", tareas);
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