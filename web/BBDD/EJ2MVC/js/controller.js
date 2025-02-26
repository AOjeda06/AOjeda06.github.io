// Clase controlador
const Controller = {
    // Inicialización de la vista
    init: function () {
        View.init();
    },

    // Función para manejar el envío del formulario
    handleFormSubmit: function (event) {
        event.preventDefault();
        let objJson = Model.generarObj();

        // Comprobamos que los campos no estén vacíos
        if (!objJson.nombre || !objJson.apellidos || !objJson.edad || !objJson.ciudad) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Añadimos la fila a la tabla
        let fila = View.generaTr(objJson);
        $("#dataTable tbody").append(fila);

        // Guardamos la fila en el modelo (en el array con los datos de las filas) y actualizamos las estadísticas
        Model.guardarFila(objJson);

        // Actualizamos las estadísticas
        Controller.actualizarEstadisticas();
    },

    // Función para manejar el clic en una fila de la tabla
    handleRowClick: function () {
        Model.eliminarFila($(this).data("id"));
        $(this).remove();

        // Actualizamos las estadísticas
        Controller.actualizarEstadisticas();
    },

    // Función para actualizar las estadísticas
    actualizarEstadisticas: function () {
        // Crea un array para los datos de las edades
        let edades = [];

        // Recorre las filas de la tabla y añade las edades al array
        $("#dataTable tbody tr").each(function () {
            let edad = parseInt($(this).find("td:eq(2)").text());
            edades.push(edad);
        });

        // Muestra las estadísticas
        View.mostrarEstadisticas(edades);
    }
};

// Inicialización del controlador
$(document).ready(function () {
    Controller.init();
});
