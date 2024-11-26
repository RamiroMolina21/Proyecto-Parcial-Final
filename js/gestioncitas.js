nombreLocalStoreCitas = "citas"; // Nombre del localStorage para citas
nombreLocalStore = "especialidades"; // Nombre del localStorage de especialidades
nombreLocalStoreMedicos = "medicos"; // Nombre del localStorage de médicos

document.addEventListener("DOMContentLoaded", function() {
    mostrarCitas(); // Mostrar los registros existentes en la tabla
}); 

// Recuperar datos del formulario
function recuperarDatosFormulario() {
    const fechaHora = document.getElementById("fechaHora");
    const estadoCita = document.getElementById("estadoCita");
    const especialidadMedica = document.getElementById("especialidadMedica");
    const identificacionMedico = document.getElementById("identificacionMedico");
    const consultaMotivo = document.getElementById("consultaMotivo");

    return {
        fechaHora: fechaHora.value,
        estadoCita: estadoCita.value,
        especialidadMedica: especialidadMedica.value,
        identificacionMedico: identificacionMedico.value,
        consultaMotivo: consultaMotivo.value
    };
}

// Limpiar el formulario
function limpiarFormulario() {
    document.getElementById("fechaHora").value = "";
    document.getElementById("estadoCita").value = "";
    document.getElementById("especialidadMedica").value = "";
    document.getElementById("identificacionMedico").value = "";
    document.getElementById("consultaMotivo").value = "";
}

function esHorarioValido(fechaHora) {
    // Convertir la fecha y hora ingresada a un objeto Date
    const fechaIngresada = new Date(fechaHora);

    // Obtener la fecha y hora actual
    const ahora = new Date();

    // Validar que la fecha ingresada no sea pasada
    if (fechaIngresada < ahora) {
        alert("No se pueden crear citas en fechas u horas pasadas.");
        return false;
    }

    // Obtener la hora ingresada
    const horaIngresada = fechaIngresada.getHours();
    const minutosIngresados = fechaIngresada.getMinutes();

    // Validar horario de atención: 8:00 AM–12:00 PM y 2:00 PM–6:00 PM
    const dentroHorarioManana = horaIngresada >= 8 && horaIngresada < 12;
    const dentroHorarioTarde = horaIngresada >= 14 && horaIngresada < 18;

    if (!(dentroHorarioManana || dentroHorarioTarde)) {
        alert("El horario de atención es de 8:00 AM a 12:00 PM y de 2:00 PM a 6:00 PM.");
        return false;
    }

    return true;
}


// Guardar o actualizar cita
let idCitaEnEdicion = null; // Variable para almacenar el ID de la cita en edición

function guardar() {
    const { fechaHora, estadoCita, especialidadMedica, identificacionMedico, consultaMotivo } = recuperarDatosFormulario();

    if (fechaHora && estadoCita && especialidadMedica && identificacionMedico && consultaMotivo) {
        if (!esHorarioValido(fechaHora)) {
            return; // Detener el proceso si la validación falla
        }

        let citas = getJSONDeLocalStore(nombreLocalStoreCitas) || [];

        if (idCitaEnEdicion) {
            // Modo edición
            const citaIndex = citas.findIndex(c => c.idCita === idCitaEnEdicion);
            if (citaIndex > -1) {
                citas[citaIndex] = {
                    idCita: idCitaEnEdicion,
                    fechaHora,
                    estadoCita,
                    especialidadMedica,
                    identificacionMedico,
                    consultaMotivo
                };
                setJSONDeLocalStore(nombreLocalStoreCitas, citas);
                mostrarCitas();
                alert(`Cita con ID ${idCitaEnEdicion} actualizada con éxito.`);
            } else {
                alert("Error: No se encontró la cita en la base de datos.");
            }
        } else {
            // Modo creación
            const idCita = getValorSecuenciaCita(); // Obtener ID único
            const cita = { idCita, fechaHora, estadoCita, especialidadMedica, identificacionMedico, consultaMotivo };
            citas.push(cita);
            setJSONDeLocalStore(nombreLocalStoreCitas, citas);
            mostrarCitas();
            alert("Cita guardada con éxito.");
        }

        limpiarFormulario();
        idCitaEnEdicion = null;
    } else {
        alert("Por favor, complete todos los campos.");
    }
}
// Consultar cita por ID
function consultar() {
    const idCita = prompt("Ingrese el ID de la cita que desea consultar:");
    const citas = getJSONDeLocalStore(nombreLocalStoreCitas);
    const citaEncontrada = citas.find(c => c.idCita == idCita);

    if (citaEncontrada) {
        document.getElementById("fechaHora").value = citaEncontrada.fechaHora;
        document.getElementById("estadoCita").value = citaEncontrada.estadoCita;
        document.getElementById("especialidadMedica").value = citaEncontrada.especialidadMedica;
        document.getElementById("identificacionMedico").value = citaEncontrada.identificacionMedico;
        document.getElementById("consultaMotivo").value = citaEncontrada.consultaMotivo;
    } else {
        alert("Cita no encontrada.");
    }
}

// Mostrar citas en la tabla
function mostrarCitas() {
    const citas = getJSONDeLocalStore(nombreLocalStoreCitas) || [];
    const tablaCitas = document.getElementById("tablaCitas");
    tablaCitas.innerHTML = ""; // Limpiar tabla

    citas.forEach(cita => {
        const fila = tablaCitas.insertRow();
        fila.innerHTML = `
            <td>${cita.idCita}</td>
            <td>${cita.fechaHora}</td>
            <td>${cita.estadoCita}</td>
            <td>${cita.especialidadMedica}</td>
            <td>${cita.identificacionMedico}</td>
            <td>${cita.consultaMotivo}</td>
            <td>
                <button class="btn btn-edit" onclick="actualizar(${cita.idCita})">Actualizar</button>
                <button class="btn btn-delete" onclick="eliminar(${cita.idCita})">Eliminar</button>
            </td>
        `;
    });
}

// Actualizar cita
function actualizar(idCita) {
    const citas = getJSONDeLocalStore(nombreLocalStoreCitas);
    const cita = citas.find(c => c.idCita === idCita);

    if (cita) {
        document.getElementById("fechaHora").value = cita.fechaHora;
        document.getElementById("estadoCita").value = cita.estadoCita;
        document.getElementById("especialidadMedica").value = cita.especialidadMedica;
        document.getElementById("identificacionMedico").value = cita.identificacionMedico;
        document.getElementById("consultaMotivo").value = cita.consultaMotivo;

        idCitaEnEdicion = idCita;

        alert("Puedes actualizar los datos y luego hacer clic en GUARDAR.");
    } else {
        alert(`No se encontró una cita con el ID ${idCita}.`);
    }
}

// Eliminar cita
function eliminar(idCita) {
    const citas = getJSONDeLocalStore(nombreLocalStoreCitas);
    const index = citas.findIndex(c => c.idCita === idCita);

    if (index > -1) {
        if (confirm(`¿Estás seguro de que deseas eliminar la cita con ID ${idCita}?`)) {
            citas.splice(index, 1);
            setJSONDeLocalStore(nombreLocalStoreCitas, citas);
            mostrarCitas();
            alert(`Cita con ID ${idCita} eliminada con éxito.`);
        }
    } else {
        alert(`No se encontró una cita con el ID ${idCita}.`);
    }
}

// Cargar especialidades y médicos en los selects al cargar la página
function cargarDatosIniciales() {
    const especialidades = getJSONDeLocalStore(nombreLocalStore) || [];
    const medicos = getJSONDeLocalStore(nombreLocalStoreMedicos) || [];
    const selectEspecialidades = document.getElementById("especialidadMedica");
    const selectMedicos = document.getElementById("identificacionMedico");

    // Llenar select de especialidades
    especialidades.forEach(especialidad => {
        const option = document.createElement("option");
        option.value = especialidad.nombreEspecialidad;
        option.textContent = especialidad.nombreEspecialidad;
        selectEspecialidades.appendChild(option);
    });

    // Llenar select de médicos
    medicos.forEach(medico => {
        const option = document.createElement("option");
        option.value = medico.idMedico;
        option.textContent = `${medico.idMedico} - ${medico.nombreMedico}`;
        selectMedicos.appendChild(option);
    });
}

// Cargar datos iniciales y mostrar citas al cargar la página
window.onload = function() {
    cargarDatosIniciales();
    mostrarCitas();
};
