let filas = [];
let idCounter = 0;

const Model = {
    generarObj: function () {
        return {
            id: idCounter++,
            nombre: $("#nombre").val(),
            apellidos: $("#apellidos").val(),
            edad: $("#edad").val(),
            ciudad: $("#ciudad").val()
        };
    },

    guardarFila: function (fila) {
        filas.push(fila);
        this.serializar(filas);
    },

    eliminarFila: function (id) {
        filas = filas.filter(f => f.id !== id);
    },

    serializar: function (array) {
        return JSON.stringify(array);
    },

    deserializar: function (filasSerializado) {
        return JSON.parse(filasSerializado);
    }
};
