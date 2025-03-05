// Clase vista
const View = {
    // Inicialización de la vista
    init: function () {
        $("#dataForm").on("submit", Controller.handleFormSubmit);
        $("#dataTable").on("click", "tr", Controller.handleRowClick);
        $("#dataTable").on("click", ".eliminar-fila", function () {
            const id = $(this).data("id");
            Controller.handleEliminarFila(id);
        });
    },
    

    // Función para generar una fila de la tabla
    generaTr: function (objJson) {
        return `
            <tr id="${objJson.id}" id="row-${objJson.id}">
                <td>${objJson.nombre}</td>
                <td>${objJson.apellidos}</td>
                <td>${objJson.edad}</td>
                <td>${objJson.ciudad}</td>
            </tr>
        `;
    },
    
    // Función para actualizar la tabla
    actualizarTabla: function (filas) {
        // Borra la tabla entera y la reimprime
        $("#dataTable tbody").empty();
        filas.forEach(fila => {
            $("#dataTable tbody").append(this.generaTr(fila));
        });
    },

    // Función para mostrar las estadísticas
    mostrarEstadisticas: function (edades) {
        // Comprueba si hay datos de edad
        if (edades.length > 0) {
            // Calcula la suma, media, edad máxima y edad mínima

            /* Reduce es un método de los arrays que aplica una función 
            a un acumulador y a cada valor de un array (de izquierda a derecha)
            para reducirlo a un único valor*/
            let suma = edades.reduce((a, b) => a + b, 0);
            let media = suma / edades.length;
            let maximo = Math.max(...edades);
            let minimo = Math.min(...edades);

            // Muestra las estadísticas
            $("#estadisticas").html(`
                Suma de edades: ${suma}<br>
                Media de edades: ${media}<br>
                Edad máxima: ${maximo}<br>
                Edad mínima: ${minimo}
            `);
        } else {
            // Muestra un mensaje si no hay datos de edad
            $("#estadisticas").html("No hay datos de edad.");
        }
    }
};
