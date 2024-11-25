class Comunicacion{
    constructor(idmensaje, remitente, destinatario, fechaHoraMensaje, contenidoMensaje, estadoMensaje){
        this.idMensaje = idmensaje
        this.remitente = remitente
        this.destinatario = destinatario
        this.fechaHoraMensaje = fechaHoraMensaje
        this.contenidoMensaje = contenidoMensaje
        this.estadoMensaje = estadoMensaje

    }

    getIdMensaje(){
        return this.idMensaje
    }

    setIdMensaje(){
        this.idMensaje = idMensaje
    }
}