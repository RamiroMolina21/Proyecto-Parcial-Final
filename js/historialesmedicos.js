class HistorialMedico{
    constructor(idHistorialMedico, fechaConsulta, tratamiento, diagnostico,notasAdicionales,adjuntoArchivos ){
        this.idHistorialMedico = idHistorialMedico;
        this.fechaConsulta = fechaConsulta;
        this.tratamiento = tratamiento;
        this.diagnostico = diagnostico;
        this.notasAdicionales = notasAdicionales;
        this.adjuntoArchivos = adjuntoArchivos;

    }

    getIdHistorialMedico(){
        return this.idHistorialMedico;
    }

    setIdHistorialMedico(){
        this.idHistorialMedico = idHistorialMedico;
    }
}