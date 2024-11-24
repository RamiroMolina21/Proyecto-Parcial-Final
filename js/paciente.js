class Paciente{
    constructor(idPaciente, correoPaciente, nombrePaciente, estadosdePerfil, fechaNacimientoPaciente, direccionPaciente){
        this.idPaciente = idPaciente
        this.correoPaciente = correoPaciente
        this.nombrePaciente = nombrePaciente
        this.estadosdePerfil = estadosdePerfil
        this.fechaNacimientoPaciente = fechaNacimientoPaciente
        this.direccionPaciente = direccionPaciente
    }


    getIdPaciente(){
        return this.idPaciente
    }

    setIdPaciente(){
        this.idPaciente = idPaciente
    }
}

