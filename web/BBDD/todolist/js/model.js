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

    // Función para generar un objeto con los datos del formulario
    generarObj: function () {
        return {
            id: idCounter++,
            tarea: $("#todo-input").val(),
            fecha: $("#todo-date").val(),
            estado: $("#todo-state").val()
        };
    },

    // Función para guardar una tarea en el array
    guardarTarea: function (tarea) {
        tareas.push(tarea);
    },

    // Función para eliminar una tarea del array
    eliminarTarea: function (id) {
        tareas = tareas.filter(t => t.id !== parseInt(id));
    },

}