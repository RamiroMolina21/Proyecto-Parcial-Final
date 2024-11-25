nombreLocalStore = 'secuencia'

function getValorSecuenciaPaciente() {

    sencuencias = getJSONDeLocalStore(nombreLocalStore)

    if (sencuencias.length == 0) {

        secuencia = new Secuencia()
        sencuencias.push(secuencia)

    }

    sencuencias[0].autonumericoEspecialidad += 1
    sencuencias[0].autonumericoMedico += 1
    sencuencias[0].autonumericoCita += 1
    sencuencias[0].autonumericoHistorialMedico += 1
    sencuencias[0].autonumericoFactura += 1
    sencuencias[0].autonumericoMensaje += 1
    sencuencias[0].autonumericoUsuario += 1

    setJSONDeLocalStore(nombreLocalStore, sencuencias)

    return {
        autonumericoEspecialidad: sencuencias[0].autonumericoEspecialidad,
        autonumericoMedico: sencuencias[0].autonumericoMedico,
        autonumericoCita: sencuencias[0].autonumericoCita,
        autonumericoHistorialMedico: sencuencias[0].autonumericoHistorialMedico,
        autonumericoFactura: sencuencias[0].autonumericoFactura,
        autonumericoMensaje: sencuencias[0].autonumericoMensaje,
        autonumericoUsuario: sencuencias[0].autonumericoUsuario,
    };

}


function getValorSecuenciaMedico() {
    const secuencias = getJSONDeLocalStore(nombreLocalStore);

    if (secuencias.length === 0) {
        const nuevaSecuencia = new Secuencia();
        secuencias.push(nuevaSecuencia);
    }

    secuencias[0].autonumericoMedico += 1;
    setJSONDeLocalStore(nombreLocalStore, secuencias);

    // Retorna solo el valor del autonumérico para médicos
    return secuencias[0].autonumericoMedico;
}

function getValorSecuenciaCita() {
    const secuencias = getJSONDeLocalStore(nombreLocalStore);

    if (secuencias.length === 0) {
        const otraSecuencia = new Secuencia();
        secuencias.push(otraSecuencia);
    }

    secuencias[0].autonumericoCita += 1;
    setJSONDeLocalStore(nombreLocalStore, secuencias);

    // Retorna solo el valor del autonumérico para Cita
    return secuencias[0].autonumericoCita;
    
}



function getValorSecuenciaHistorialMedico() {
    const secuencias = getJSONDeLocalStore(nombreLocalStore);

    if (secuencias.length === 0) {
        const otramasSecuencia = new Secuencia();
        secuencias.push(otramasSecuencia);
    }

    secuencias[0].autonumericoHistorialMedico += 1;
    setJSONDeLocalStore(nombreLocalStore, secuencias);

    // Retorna solo el valor del autonumérico para Historial Medico
    return secuencias[0].autonumericoHistorialMedico;
    
}


function getValorSecuenciaPago() {
    const secuencias = getJSONDeLocalStore(nombreLocalStore);

    if (secuencias.length === 0) {
        const otramassSecuencia = new Secuencia();
        secuencias.push(otramassSecuencia);
    }

    secuencias[0].autonumericoFactura += 1;
    setJSONDeLocalStore(nombreLocalStore, secuencias);

    // Retorna solo el valor del autonumérico para Historial Medico
    return secuencias[0].autonumericoFactura;
    
}