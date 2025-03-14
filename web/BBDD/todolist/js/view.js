// Clase vista
const View = {
    // Inicialización de la vista
    init: function () {
        $("#todo-form").on("submit", Controller.handleFormSubmit);
        $("#dataTable").on("click", ".deleteButton", Controller.handleDeleteButtonClick);
        $("#dataTable").on("click", ".cambiarEstado", Controller.handleStateClick);
    },

    // Función para generar una fila de la tabla
    generaTr: function (objJson) {
        return `
            <tr id="row-${objJson.id}">
                <td>${objJson.tarea}</td>
                <td>${objJson.fecha}</td>
                <td class="cambiarEstado">${objJson.estado ? "Completada" : "Pendiente"}</td>
                <td><button class="deleteButton">Eliminar</button></td>
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
    }
};