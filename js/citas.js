class Citas{
    constructor(idCita, fechaHora, estadoCita, especialidadMedica,identificacionMedico,consultaMotivo ){
        this.idCita = idCita;
        this.fechaHora = fechaHora;
        this.estadoCita = estadoCita;
        this.especialidadMedica = especialidadMedica;
        this.identificacionMedico = identificacionMedico;
        this.consultaMotivo = consultaMotivo;


    }

    getIdCita(){
        return this.idCita;
    }

    setIdCita(){
        this.idCita = idCita;
    }
}