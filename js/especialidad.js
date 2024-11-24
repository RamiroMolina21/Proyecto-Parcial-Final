class Especialidad{
    constructor(idEspecialidad, nombreEspecialidad, descripcionEspecialidad, estadodeEspecialidad, fechaCreacion){
        this.idEspecialidad = idEspecialidad;
        this.nombreEspecialidad = nombreEspecialidad;
        this.descripcionEspecialidad = descripcionEspecialidad;
        this.estadodeEspecialidad = estadodeEspecialidad;
        this.fechaCreacion = fechaCreacion;
    }


    getIdEspecialidad(){
        return this.idEspecialidad;
    }

    setIdEspecialidad(){
        this.idEspecialidad = idEspecialidad;
    }
}
