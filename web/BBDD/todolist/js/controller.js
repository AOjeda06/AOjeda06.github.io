// Clase controlador
const Controller = {
    // Inicialización de la vista
    init: function () {
        View.init();
    },

    // Función para manejar el envío del formulario
    handleFormSubmit: function (event) {
        event.preventDefault();

        // Creamos el objeto
        let objJson = Model.generarObj();

        // Comprobamos que el campo no esté vacío
        if (!objJson.tarea) {
            alert("La tarea no puede estar vacía.");
            return;
        }

        // Generamos el objeto en el array del modelo
        Model.guardarTarea(objJson);

        // Imprimimos todas las filas
        View.actualizarTabla(Model.obtenerTareas());
    },

    // Función para manejar el clic en el botón de eliminar
    handleDeleteButtonClick: function () {
        // Elimina del id de la fila y se lo pasa a la función eliminarFila
        let id = $(this).attr("id");
        Model.eliminarTarea(id);

        // Actualizamos las estadísticas
        View.actualizarTabla();
    },
}