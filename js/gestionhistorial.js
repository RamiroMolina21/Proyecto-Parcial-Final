var nombreLocalStoreHistorial = "historialMedico";
let idHistorialEnEdicion = null; // Variable para el ID del historial en edición



document.addEventListener("DOMContentLoaded", function() {
    mostrarHistoriales(); // Mostrar los registros existentes en la tabla
});  


// Función para validar el usuario y contraseña
function validarUsuarioYContrasena() {
    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("contraseña").value;
    var confirmarContrasena = document.getElementById("confirmar").value;

    if (usuario !== "medico") {
        alert("El usuario debe ser 'medico'.");
        return false;
    }
    if (contrasena !== "Medico1*") {
        alert("La contraseña debe ser 'Medico1*'.");
        return false;
    }
    if (contrasena !== confirmarContrasena) {
        alert("La confirmación de contraseña no coincide.");
        return false;
    }
    return true;
}


// Función para recuperar los datos del formulario
function recuperarDatosFormulario() {
    var fechaConsulta = document.getElementById("fechaConsulta").value;
    var tratamiento = document.getElementById("tratamiento").value;
    var diagnostico = document.getElementById("diagnostico").value;
    var notasAdicionales = document.getElementById("notasAdicionales").value;
    // No se puede leer el valor real del input[type="file"], pero se puede trabajar con el archivo subido si es necesario
    var adjuntoArchivos = document.getElementById("adjuntoArchivos").files.length > 0
        ? document.getElementById("adjuntoArchivos").files[0].name
        : "";

    return { fechaConsulta, tratamiento, diagnostico, notasAdicionales, adjuntoArchivos };
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("fechaConsulta").value = "";
    document.getElementById("tratamiento").value = "";
    document.getElementById("diagnostico").value = "";
    document.getElementById("notasAdicionales").value = "";

    // Reemplazar el input[type="file"] para limpiar su contenido
    const inputArchivo = document.getElementById("adjuntoArchivos");
    const nuevoInputArchivo = inputArchivo.cloneNode(true);
    inputArchivo.parentNode.replaceChild(nuevoInputArchivo, inputArchivo);

    document.getElementById("usuario").value = "";
    document.getElementById("contraseña").value = "";
    document.getElementById("confirmar").value = "";
    document.getElementById("fechaConsulta").focus();
}


// Función para guardar un historial médico (crear o actualizar)
function guardar() {
    if (!validarUsuarioYContrasena()) {
        return; // Detener la ejecución si la validación falla
    }

    // Recuperar datos del formulario
    const datos = recuperarDatosFormulario();
    let historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];

    if (idHistorialEnEdicion !== null) {
        // Modo edición: actualizar historial existente
        const indice = buscarIndiceHistorial(idHistorialEnEdicion);
        if (indice > -1) {
            historiales[indice] = {
                idHistorialMedico: idHistorialEnEdicion,
                ...datos, // Aquí se actualizan los datos del historial
            };
            alert(`El historial médico con ID ${idHistorialEnEdicion} ha sido actualizado.`);
        } else {
            alert("Error: No se encontró el historial en la base de datos.");
        }
    } else {
        // Modo creación: agregar un nuevo historial
        const idAutogenerado = getValorSecuenciaHistorialMedico(); // Generar ID único
        const nuevoHistorial = {
            idHistorialMedico: idAutogenerado,
            ...datos,
        };
        historiales.push(nuevoHistorial);
        alert("Nuevo historial médico guardado con éxito.");
    }

    // Guardar los cambios en el localStorage
    setJSONDeLocalStore(nombreLocalStoreHistorial, historiales);

    // Limpiar formulario, actualizar tabla y resetear el ID en edición
    limpiarFormulario();
    mostrarHistoriales();
    idHistorialEnEdicion = null;  // Reseteamos el ID de edición después de guardar
}


// Función para buscar un índice de historial
function buscarIndiceHistorial(id) {
    var historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];
    return historiales.findIndex(h => h.idHistorialMedico == id);
}

// Función para consultar un historial médico por ID
function consultar() {
    if (!validarUsuarioYContrasena()) {
        return; // Detener la ejecución si la validación falla
    }

    var idHistorial = prompt("Ingrese el ID del historial médico a consultar:");
    var historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];
    var historial = historiales.find(h => h.idHistorialMedico == idHistorial);

    if (historial) {
        document.getElementById("fechaConsulta").value = historial.fechaConsulta;
        document.getElementById("tratamiento").value = historial.tratamiento;
        document.getElementById("diagnostico").value = historial.diagnostico;
        document.getElementById("notasAdicionales").value = historial.notasAdicionales;
        alert("Historial médico encontrado. Puedes editar o guardar cambios.");
    } else {
        alert("No se encontró ningún historial médico con ese ID.");
    }
}

// Función para actualizar un historial médico
function actualizar() {
    if (!validarUsuarioYContrasena()) {
        return; // Detener la ejecución si la validación falla
    }

    var datos = recuperarDatosFormulario();
    var idHistorial = prompt("Ingrese el ID del historial médico a actualizar:");
    var historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];
    var indice = buscarIndiceHistorial(idHistorial);

    if (indice > -1) {
        historiales[indice].fechaConsulta = datos.fechaConsulta;
        historiales[indice].tratamiento = datos.tratamiento;
        historiales[indice].diagnostico = datos.diagnostico;
        historiales[indice].notasAdicionales = datos.notasAdicionales;
        historiales[indice].adjuntoArchivos = datos.adjuntoArchivos;
        setJSONDeLocalStore(nombreLocalStoreHistorial, historiales);
        mostrarHistoriales();
        alert("El historial médico ha sido actualizado con éxito.");
    } else {
        alert("No se encontró ningún historial médico con ese ID.");
    }
}

// Función para eliminar un historial médico por ID
function eliminarHistorial(id) {
    if (!validarUsuarioYContrasena()) {
        return; // Detener la ejecución si la validación falla
    }

    var historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];
    var indice = buscarIndiceHistorial(id);

    if (indice > -1) {
        if (confirm(`¿Está seguro de eliminar el historial médico con ID ${id}?`)) {
            historiales.splice(indice, 1);
            setJSONDeLocalStore(nombreLocalStoreHistorial, historiales);
            mostrarHistoriales();
            alert("El historial médico ha sido eliminado con éxito.");
        }
    } else {
        alert("No se encontró ningún historial médico con ese ID.");
    }
}

// Función para mostrar todos los historiales médicos
// Función para mostrar todos los historiales médicos
function mostrarHistoriales() {
    const historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];
    const tabla = document.getElementById("tablaHistorial");

    // Limpiar las filas existentes, excepto la cabecera
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    // Añadir las filas desde el localStorage
    historiales.forEach(function(historial) {
        const fila = tabla.insertRow();

        const celdaId = fila.insertCell(0);
        const celdaFechaConsulta = fila.insertCell(1);
        const celdaTratamiento = fila.insertCell(2);
        const celdaDiagnostico = fila.insertCell(3);
        const celdaNotasAdicionales = fila.insertCell(4);
        const celdaAdjuntoArchivos = fila.insertCell(5);
        const celdaAcciones = fila.insertCell(6);

        celdaId.textContent = historial.idHistorialMedico;
        celdaFechaConsulta.textContent = historial.fechaConsulta;
        celdaTratamiento.textContent = historial.tratamiento;
        celdaDiagnostico.textContent = historial.diagnostico;
        celdaNotasAdicionales.textContent = historial.notasAdicionales;
        celdaAdjuntoArchivos.textContent = historial.adjuntoArchivos;

        // Añadir botones de acción
        celdaAcciones.innerHTML = `
            <button class="btn btn-edit" onclick="editarHistorial(${historial.idHistorialMedico})">Actualizar</button>
            <button class="btn btn-delete" onclick="eliminarHistorial(${historial.idHistorialMedico})">Eliminar</button>
        `;
    });
}


// Función para editar un historial médico
function editarHistorial(id) {
    const historiales = getJSONDeLocalStore(nombreLocalStoreHistorial) || [];
    const historial = historiales.find(h => h.idHistorialMedico == id);

    if (historial) {
        // Cargar datos del historial en el formulario
        document.getElementById("fechaConsulta").value = historial.fechaConsulta;
        document.getElementById("tratamiento").value = historial.tratamiento;
        document.getElementById("diagnostico").value = historial.diagnostico;
        document.getElementById("notasAdicionales").value = historial.notasAdicionales;

        // No intentamos establecer un valor en el campo adjuntoArchivos
        alert("Puedes actualizar los datos y luego hacer clic en GUARDAR.");

        // Guardar el ID del historial que se está editando
        idHistorialEnEdicion = id;
    } else {
        alert(`No se encontró un historial médico con el ID ${id}.`);
    }
}


