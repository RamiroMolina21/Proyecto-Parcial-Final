var nombreLocalStore = "especialidades";

function recuperarDatosFormulario() {
    var nombreEspecialidad = document.getElementById("nombreEspecialidad");
    var descripcionEspecialidad = document.getElementById("descripcionEspecialidad");
    var estadoDeEspecialidad = document.getElementById("estadodeEspecialidad");
    var fechaCreacion = new Date().toISOString().split("T")[0]; // Fecha actual
    return { nombreEspecialidad, descripcionEspecialidad, estadoDeEspecialidad, fechaCreacion };
}

function limpiarFormulario() {
    document.getElementById("nombreEspecialidad").value = "";
    document.getElementById("descripcionEspecialidad").value = "";
    document.getElementById("estadodeEspecialidad").value = "Activo";
    document.getElementById("nombreEspecialidad").focus();
}

function guardar() {
    // Recuperar datos del formulario
    var datos = recuperarDatosFormulario();

    // Obtener el ID autogenerado para especialidades
    var secuencias = getValorSecuenciaPaciente();
    var idAutogenerado = secuencias.autonumericoEspecialidad;

    // Crear un nuevo objeto Especialidad
    var especialidad = new Especialidad(
        idAutogenerado,
        datos.nombreEspecialidad.value,
        datos.descripcionEspecialidad.value,
        datos.estadoDeEspecialidad.value,
        datos.fechaCreacion
    );

    // Guardar en el localStorage
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    especialidades.push(especialidad);
    setJSONDeLocalStore(nombreLocalStore, especialidades);

    // Limpiar formulario, actualizar tabla y mostrar alerta
    limpiarFormulario();
    mostrarEspecialidades();
    alert("La especialidad ha sido guardada con éxito con ID: " + idAutogenerado);
}

function buscarIndiceEspecialidad(id) {
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    return especialidades.findIndex(e => e.idEspecialidad == id);
}

function consultar() {
    var idEspecialidad = prompt("Ingrese el ID de la especialidad a consultar:");
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    var especialidad = especialidades.find(e => e.idEspecialidad == idEspecialidad);

    if (especialidad) {
        document.getElementById("nombreEspecialidad").value = especialidad.nombreEspecialidad;
        document.getElementById("descripcionEspecialidad").value = especialidad.descripcionEspecialidad;
        document.getElementById("estadodeEspecialidad").value = especialidad.estadodeEspecialidad;
        alert("Especialidad encontrada. Puedes editar o guardar cambios.");
    } else {
        alert("No se encontró ninguna especialidad con ese ID.");
    }
}

function actualizar() {
    var datos = recuperarDatosFormulario();
    var idEspecialidad = prompt("Ingrese el ID de la especialidad a actualizar:");
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    var indice = buscarIndiceEspecialidad(idEspecialidad);

    if (indice > -1) {
        especialidades[indice].nombreEspecialidad = datos.nombreEspecialidad.value;
        especialidades[indice].descripcionEspecialidad = datos.descripcionEspecialidad.value;
        especialidades[indice].estadodeEspecialidad = datos.estadoDeEspecialidad.value;
        especialidades[indice].fechaCreacion = datos.fechaCreacion;
        setJSONDeLocalStore(nombreLocalStore, especialidades);
        mostrarEspecialidades();
        alert("La especialidad ha sido actualizada con éxito!");
    } else {
        alert("No se encontró ninguna especialidad con ese ID.");
    }
}

function eliminarEspecialidad(id) {
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    var indice = buscarIndiceEspecialidad(id);

    if (indice > -1) {
        alert("Especialidad con ID " + id + " ha sido eliminada.");
        especialidades.splice(indice, 1);
        setJSONDeLocalStore(nombreLocalStore, especialidades);
        mostrarEspecialidades();
    } else {
        alert("No se encontró ninguna especialidad con ese ID.");
    }
}

function mostrarEspecialidades() {
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    var tabla = document.querySelector(".table-container table");

    // Limpiar las filas existentes, excepto la cabecera
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    // Añadir las filas desde el localStorage
    especialidades.forEach(function(especialidad) {
        var fila = tabla.insertRow();

        var celdaId = fila.insertCell(0);
        var celdaNombre = fila.insertCell(1);
        var celdaDescripcion = fila.insertCell(2);
        var celdaEstado = fila.insertCell(3);
        var celdaFechaCreacion = fila.insertCell(4);
        var celdaAcciones = fila.insertCell(5);

        celdaId.textContent = especialidad.idEspecialidad;
        celdaNombre.textContent = especialidad.nombreEspecialidad;
        celdaDescripcion.textContent = especialidad.descripcionEspecialidad;
        celdaEstado.textContent = especialidad.estadodeEspecialidad;
        celdaFechaCreacion.textContent = especialidad.fechaCreacion;

        // Añadir botones de acción
        celdaAcciones.innerHTML = `
            <button class="btn btn-edit" onclick="editarEspecialidad(${especialidad.idEspecialidad})">Actualizar</button>
            <button class="btn btn-delete" onclick="eliminarEspecialidad(${especialidad.idEspecialidad})">Eliminar</button>
        `;
    });
}

function editarEspecialidad(id) {
    var especialidades = getJSONDeLocalStore(nombreLocalStore);
    var especialidad = especialidades.find(e => e.idEspecialidad == id);

    if (especialidad) {
        document.getElementById("nombreEspecialidad").value = especialidad.nombreEspecialidad;
        document.getElementById("descripcionEspecialidad").value = especialidad.descripcionEspecialidad;
        document.getElementById("estadodeEspecialidad").value = especialidad.estadodeEspecialidad;
        alert("Puedes actualizar los datos y luego hacer clic en GUARDAR.");
    }
}
