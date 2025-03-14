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
        // Elimina 'row-' del id de la fila y se lo pasa a la función eliminarTarea
        let id = $(this).closest("tr").attr("id").replace("row-", "");
        Model.eliminarTarea(id);

        // Actualizamos la tabla
        View.actualizarTabla(Model.obtenerTareas());
    },

    // Función para manejar el clic en el botón de cambiar estado
    handleStateClick: function () {
        // Cambia el estado de la fila y se lo pasa a la función cambiarEstado
        let id = $(this).closest("tr").attr("id").replace("row-", "");
        Model.cambiarEstado(id);

        // Actualizamos la tabla
        View.actualizarTabla(Model.obtenerTareas());
    }
};