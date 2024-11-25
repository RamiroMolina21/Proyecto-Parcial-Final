class Pagos {
    constructor(idPago, montoPagar, fechaEmision, metodoPago, conceptoServicio, estadoPago, descuento, fechaVencimiento) {
        this.idPago = idPago;
        this.montoPagar = montoPagar;
        this.fechaEmision = fechaEmision;
        this.metodoPago = metodoPago;
        this.conceptoServicio = conceptoServicio;
        this.estadoPago = estadoPago;
        this.descuento = descuento;
        this.fechaVencimiento = fechaVencimiento;
    }

    getIdFactura() {
        return this.idPago;
    }

    setIdFactura(idPago) {
        this.idPago = idPago;
    }
}
