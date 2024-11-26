class Usuario{
    constructor(idUsuario,nombreusuario, password, rolUsuario, estadodeCuenta, fechaCreacionCuenta){
        this.idUsuario = idUsuario;
        this.nombreusuario = nombreusuario;
        this.password = password;
        this.rolUsuario = rolUsuario;
        this.estadodeCuenta = estadodeCuenta;
        this.fechaCreacionCuenta = fechaCreacionCuenta;

    }

    getIdUsuario(){
        return this.idUsuario;
    }

    setIdUsuario(){
        this.idUsuario = idUsuario;
    }
}