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