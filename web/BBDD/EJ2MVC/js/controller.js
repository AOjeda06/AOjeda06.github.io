// Clase controlador
const Controller = {
    // Inicialización de la vista
    init: function () {
        View.init();
    },

    // Función para manejar el envío del formulario
    handleFormSubmit: function (event) {
        event.preventDefault();

        // Comprobamos que los campos no estén vacíos
        if (!objJson.nombre || !objJson.apellidos || !objJson.edad || !objJson.ciudad) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        let objJson = Model.generarObj();

        // Guardamos la fila en el modelo (en el array con los datos de las filas) y actualizamos las estadísticas
        Model.guardarFila(View.generaTr(objJson));

        // Imprimimos todas las filas
        View.actualizarTabla(Model.filas);

        // Actualizamos las estadísticas
        View.actualizarEstadisticas();
    },

    // Función para manejar el clic en una fila de la tabla
    handleRowClick: function () {
        // Elimina 'row-' del id de la fila y se lo pasa a la función eliminarFila
        let id = $(this).attr("id").replace("row-", "");
        Model.eliminarFila(id);
    
        // Actualizamos las estadísticas
        View.actualizarEstadisticas();
    },

};


