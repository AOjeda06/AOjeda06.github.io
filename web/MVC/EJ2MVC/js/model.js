// Contador para asignar un id único a cada fila
let idCounter = 0;

// Array para almacenar los datos de las filas de la tabla
let filas = [];

// Clase modelo
const Model = {
    // Función para obtener el array con los objetos
    obtenerFilas: function () {
        return filas;
    },

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

    // Funcion para guardar una fila en el array 
    guardarFila: function (fila) {
        filas.push(fila);
        console.log(filas);
    },

    // Funcion para eliminar una fila del array
    eliminarFila: function (id) {
        if (id !== "tableHeader") {
            filas = filas.filter(f => f.id !== parseInt(id));
            $(`#row-${id}`).remove();
        }
    },

};
