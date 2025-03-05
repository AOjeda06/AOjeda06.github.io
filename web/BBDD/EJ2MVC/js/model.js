// Array para almacenar los datos de las filas de la tabla
let filas = [];

// Contador para asignar un id único a cada fila
let idCounter = 0;

// Clase modelo
const Model = {
    // Funcion para generar un objeto con los datos del formulario
    generarObj: function () {
        return {
            id: idCounter++,
            nombre: $("#nombre").val(),
            apellidos: $("#apellidos").val(),
            edad: $("#edad").val(),
            ciudad: $("#ciudad").val()
        };
    },

    // Funcion para guardar una fila en el array y serializarlo
    guardarFila: function (fila) {
        filas.push(fila);
        this.serializar(filas);
    },

    // Funcion para eliminar una fila del array
    eliminarFila: function (id) {
        if (id !== "tableHeader") {
            filas = filas.filter(f => f.id !== parseInt(id));
            $(`#row-${id}`).remove();
        }
    },

    // Funcion para serializar un array
    serializar: function (array) {
        return JSON.stringify(array);
    },

    // Funcion para deserializar el array con los datos de las filas
    deserializar: function (filasSerializado) {
        return JSON.parse(filasSerializado);
    }
};
