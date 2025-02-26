const Controller = {
    init: function () {
        View.init();
    },

    handleFormSubmit: function (event) {
        event.preventDefault();
        let objJson = Model.generarObj();

        if (!objJson.nombre || !objJson.apellidos || !objJson.edad || !objJson.ciudad) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        let fila = View.generaTr(objJson);
        $("#dataTable tbody").append(fila);

        Model.guardarFila(objJson);
        Controller.actualizarEstadisticas();
    },

    handleRowClick: function () {
        let id = $(this).data("id");
        Model.eliminarFila(id);
        $(this).remove();
        Controller.actualizarEstadisticas();
    },

    actualizarEstadisticas: function () {
        let edades = [];
        $("#dataTable tbody tr").each(function () {
            let edad = parseInt($(this).find("td:eq(2)").text());
            edades.push(edad);
        });

        View.mostrarEstadisticas(edades);
    }
};

$(document).ready(function () {
    Controller.init();
});
