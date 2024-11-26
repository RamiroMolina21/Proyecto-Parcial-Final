var nombreLocalStore = "pacientes";

function recuperarDatosFormulario() {
    var idPaciente = document.getElementById("idPaciente");
    var correoPaciente = document.getElementById("correoPaciente");
    var nombrePaciente = document.getElementById("nombrePaciente");
    var estadosdePerfil = document.getElementById("estadosdePerfil");
    var fechaNacimientoPaciente = document.getElementById("fechaNacimientoPaciente");
    var direccionPaciente = document.getElementById("direccionPaciente");
}

function limpiarFormulario() {
    idPaciente.value = "";
    correoPaciente.value = "";
    nombrePaciente.value = "";
    estadosdePerfil.value = "";
    fechaNacimientoPaciente.value = "";
    direccionPaciente.value = "";
    idPaciente.focus();
}

function guardar() {
    if (!validarUsuarioYContrasena()) return; // Validación de usuario y contraseña

    recuperarDatosFormulario();
    var paciente = new Paciente(
        idPaciente.value,
        correoPaciente.value,
        nombrePaciente.value,
        estadosdePerfil.value,
        fechaNacimientoPaciente.value,
        direccionPaciente.value
    );
    var pacientes = getJSONDeLocalStore(nombreLocalStore);
    pacientes.push(paciente);
    setJSONDeLocalStore(nombreLocalStore, pacientes);
    limpiarFormulario();
    
    alert("¡El paciente ha sido guardado con éxito!");
}

function buscarIndicePaciente() {
    var resultado = -1;
    var pacientes = getJSONDeLocalStore(nombreLocalStore);
    for (let i = 0; i < pacientes.length; i++) {
        if (pacientes[i].idPaciente == idPaciente.value) {
            resultado = i;
        }
    }
    return resultado;
}

function consultar() {
    if (!validarUsuarioYContrasena()) return; // Validación de usuario y contraseña

    recuperarDatosFormulario();
    this.pacientes = getJSONDeLocalStore(nombreLocalStore);
    var indicePaciente = buscarIndicePaciente();
    if (indicePaciente != -1) {
        correoPaciente.value = pacientes[indicePaciente].correoPaciente;
        nombrePaciente.value = pacientes[indicePaciente].nombrePaciente;
        estadosdePerfil.value = pacientes[indicePaciente].estadosdePerfil;
        fechaNacimientoPaciente.value = pacientes[indicePaciente].fechaNacimientoPaciente;
        direccionPaciente.value = pacientes[indicePaciente].direccionPaciente;
    }
}

function actualizar() {
    if (!validarUsuarioYContrasena()) return; // Validación de usuario y contraseña

    recuperarDatosFormulario();
    this.pacientes = getJSONDeLocalStore(nombreLocalStore);
    var indicePaciente = buscarIndicePaciente();

    if (indicePaciente > -1) {
        pacientes[indicePaciente].correoPaciente = correoPaciente.value;
        pacientes[indicePaciente].nombrePaciente = nombrePaciente.value;
        pacientes[indicePaciente].estadosdePerfil = estadosdePerfil.value;
        pacientes[indicePaciente].fechaNacimientoPaciente = fechaNacimientoPaciente.value;
        pacientes[indicePaciente].direccionPaciente = direccionPaciente.value;
    }
    setJSONDeLocalStore(nombreLocalStore, pacientes);
    limpiarFormulario();
    
    alert("¡El paciente ha sido actualizado con éxito!");
}
function eliminar() {
    if (!validarUsuarioYContrasena()) return; // Validación de usuario y contraseña

    var pacientes = getJSONDeLocalStore(nombreLocalStore);
    var indicePaciente = buscarIndicePaciente();

    if (indicePaciente > -1) {
        alert("Paciente con ID " + pacientes[indicePaciente].idPaciente + " ELIMINADO");
        pacientes.splice(indicePaciente, 1);
        setJSONDeLocalStore(nombreLocalStore, pacientes);
    }
    limpiarFormulario();
}


function validarUsuarioYContrasena() {
    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("contraseña").value;
    var confirmarContrasena = document.getElementById("confirmar").value;

    if (usuario !== "paciente") {
        alert("El usuario debe ser 'paciente'.");
        return false;
    }
    if (contrasena !== "Paciente1*") {
        alert("La contraseña debe ser 'Paciente1*'.");
        return false;
    }
    if (contrasena !== confirmarContrasena) {
        alert("La confirmación de contraseña no coincide.");
        return false;
    }
    return true;
}

