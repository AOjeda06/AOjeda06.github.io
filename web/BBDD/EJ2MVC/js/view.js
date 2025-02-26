const View = {
    init: function () {
        $("#dataForm").on("submit", Controller.handleFormSubmit);
        $("#dataTable").on("click", "tr", Controller.handleRowClick);
    },

    generaTr: function (objJson) {
        return `
            <tr data-id="${objJson.id}">
                <td>${objJson.nombre}</td>
                <td>${objJson.apellidos}</td>
                <td>${objJson.edad}</td>
                <td>${objJson.ciudad}</td>
            </tr>
        `;
    },

    actualizarTabla: function (filas) {
        $("#dataTable tbody").empty();
        filas.forEach(fila => {
            $("#dataTable tbody").append(this.generaTr(fila));
        });
    },

    mostrarEstadisticas: function (edades) {
        if (edades.length > 0) {
            let suma = edades.reduce((a, b) => a + b, 0);
            let media = suma / edades.length;
            let maximo = Math.max(...edades);
            let minimo = Math.min(...edades);

            $("#estadisticas").html(`
                Suma de edades: ${suma}<br>
                Media de edades: ${media}<br>
                Edad máxima: ${maximo}<br>
                Edad mínima: ${minimo}
            `);
        } else {
            $("#estadisticas").html("No hay datos de edad.");
        }
    }
};
