// Clase vista
const View = {
    // Inicialización de la vista
    init: function () {
        $("#todo-form").on("submit", Controller.handleFormSubmit);
        $("#deleteButton").on("click", Controller.handleDeleteButtonClick);
    },

    // Función para generar una fila de la tabla
    generaTr: function (objJson) {
        return `
            <tr id="${objJson.id}">
            <td>${objJson.tarea}</td>
            <td><button id="deleteButton">Delete</button></td>
            </tr>
        `;
    },

    // Función para actualizar la tabla
    actualizarTabla: function (tareas = []) {
        // Borra la tabla entera y la reimprime
        $("#dataTable tbody").empty();
        tareas.forEach(tarea => {
            $("#dataTable tbody").append(this.generaTr(tarea));
        });
    },


}