class Medico{

    constructor(idMedico, nombreMedico, numeroLicenciaMedico, especialidadMedica, telefonoMedico){
        this.idMedico = idMedico;
        this.nombreMedico = nombreMedico;
        this.numeroLicenciaMedico = numeroLicenciaMedico;
        this.especialidadMedica = especialidadMedica;
        this.telefonoMedico = telefonoMedico;


    }

    getIdMedico(){
        return this.idMedico;
    }

    setIdMedico(){
        this.idMedico = idMedico;
    }
}