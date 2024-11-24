nombreLocalStore = "especialidades"; // Nombre del localStorage de especialidades
nombreLocalStoreMedicos = "medicos"; // Nombre del localStorage de médicos

function recuperarDatosFormulario() {
    var nombreMedico = document.getElementById("nombreMedico");
    var numeroLicenciaMedico = document.getElementById("numeroLicenciaMedico");
    var especialidadMedica = document.getElementById("especialidadMedica");
    var telefonoMedico = document.getElementById("telefonoMedico");

    return {
        nombreMedico: nombreMedico.value,
        numeroLicenciaMedico: numeroLicenciaMedico.value,
        especialidadMedica: especialidadMedica.value,
        telefonoMedico: telefonoMedico.value
    };
}

function limpiarFormulario() {
    document.getElementById("nombreMedico").value = "";
    document.getElementById("numeroLicenciaMedico").value = "";
    document.getElementById("especialidadMedica").value = "";
    document.getElementById("telefonoMedico").value = "";
}


function guardar() {
    const { nombreMedico, numeroLicenciaMedico, especialidadMedica, telefonoMedico } = recuperarDatosFormulario();

    if (nombreMedico && numeroLicenciaMedico && especialidadMedica && telefonoMedico) {
        let medicos = getJSONDeLocalStore(nombreLocalStoreMedicos) || [];

        if (idMedicoEnEdicion) {
            // Modo edición: actualizar el médico existente
            let medicoIndex = medicos.findIndex(m => m.idMedico === idMedicoEnEdicion);
            if (medicoIndex > -1) {
                medicos[medicoIndex] = {
                    idMedico: idMedicoEnEdicion,
                    nombreMedico,
                    numeroLicenciaMedico,
                    especialidadMedica,
                    telefonoMedico
                };
                setJSONDeLocalStore(nombreLocalStoreMedicos, medicos);
                mostrarMedicos();
                alert(`Médico con ID ${idMedicoEnEdicion} actualizado con éxito.`);
            } else {
                alert("Error: No se encontró el médico en la base de datos.");
            }
        } else {
            // Modo creación: agregar un nuevo médico
            const idMedico = getValorSecuenciaMedico(); // Obtener ID único
            const medico = { idMedico, nombreMedico, numeroLicenciaMedico, especialidadMedica, telefonoMedico };
            medicos.push(medico);
            setJSONDeLocalStore(nombreLocalStoreMedicos, medicos);
            mostrarMedicos();
            alert("Médico guardado con éxito.");
        }

        // Limpiar formulario y resetear el ID en edición
        limpiarFormulario();
        idMedicoEnEdicion = null;
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function consultar() {
    const idMedico = prompt("Ingrese el ID del médico que desea consultar:");
    let medicos = getJSONDeLocalStore(nombreLocalStoreMedicos);
    let medicoEncontrado = medicos.find(m => m.idMedico == idMedico);

    if (medicoEncontrado) {
        document.getElementById("nombreMedico").value = medicoEncontrado.nombreMedico;
        document.getElementById("numeroLicenciaMedico").value = medicoEncontrado.numeroLicenciaMedico;
        document.getElementById("especialidadMedica").value = medicoEncontrado.especialidadMedica;
        document.getElementById("telefonoMedico").value = medicoEncontrado.telefonoMedico;
    } else {
        alert("Médico no encontrado.");
    }
}

function mostrarMedicos() {
    const medicos = getJSONDeLocalStore(nombreLocalStoreMedicos);
    const tablaMedicos = document.getElementById("tablaMedicos");
    tablaMedicos.innerHTML = ""; // Limpiar tabla

    medicos.forEach(medico => {
        let fila = tablaMedicos.insertRow();
        fila.innerHTML = `
            <td>${medico.idMedico}</td>
            <td>${medico.nombreMedico}</td>
            <td>${medico.numeroLicenciaMedico}</td>
            <td>${medico.especialidadMedica}</td>
            <td>${medico.telefonoMedico}</td>
            <td>
                <button class="btn btn-edit" onclick="actualizar(${medico.idMedico})">Actualizar</button>
                <button class="btn btn-delete" onclick="eliminar(${medico.idMedico})">Eliminar</button>
            </td>
        `;
    });
}

let idMedicoEnEdicion = null; // Variable para almacenar el ID del médico en edición

function actualizar(idMedico) {
    let medicos = getJSONDeLocalStore(nombreLocalStoreMedicos);
    let medico = medicos.find(m => m.idMedico === idMedico);
    
    if (medico) {
        document.getElementById("nombreMedico").value = medico.nombreMedico;
        document.getElementById("numeroLicenciaMedico").value = medico.numeroLicenciaMedico;
        document.getElementById("especialidadMedica").value = medico.especialidadMedica;
        document.getElementById("telefonoMedico").value = medico.telefonoMedico;

        // Guardar el ID del médico que se está editando
        idMedicoEnEdicion = idMedico;

        // Mostrar mensaje al usuario
        alert("Puedes actualizar los datos y luego hacer clic en GUARDAR.");
    } else {
        alert(`No se encontró un médico con el ID ${idMedico}.`);
    }
}

function eliminar(idMedico) {
    let medicos = getJSONDeLocalStore(nombreLocalStoreMedicos);
    let index = medicos.findIndex(m => m.idMedico === idMedico);
    
    if (index > -1) {
        // Confirmación antes de eliminar
        if (confirm(`¿Estás seguro de que deseas eliminar al médico con ID ${idMedico}?`)) {
            medicos.splice(index, 1);
            setJSONDeLocalStore(nombreLocalStoreMedicos, medicos);
            mostrarMedicos();
            alert(`Médico con ID ${idMedico} eliminado con éxito.`);
        }
    } else {
        alert(`No se encontró un médico con el ID ${idMedico}.`);
    }
}

// Llenar el select de especialidades al cargar la página
function cargarEspecialidades() {
    const especialidades = getJSONDeLocalStore(nombreLocalStore);
    const selectEspecialidades = document.getElementById("especialidadMedica");

    especialidades.forEach(especialidad => {
        let option = document.createElement("option");
        option.value = especialidad.nombreEspecialidad;
        option.textContent = especialidad.nombreEspecialidad;
        selectEspecialidades.appendChild(option);
    });


}

// Cargar especialidades y mostrar médicos al cargar la página
window.onload = function() {
    cargarEspecialidades();
    mostrarMedicos(); 
}







