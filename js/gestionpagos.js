var nombreLocalStorePagos = "pagos";
var idPagoEnEdicion = null; 

// Función para recuperar datos del formulario
function recuperarDatosFormulario() {
    var montoPagar = document.getElementById("montoPagar").value;
    var fechaEmision = new Date().toISOString().split("T")[0]; // Fecha actual
    var metodoPago = document.getElementById("metodoPago").value;
    var conceptoServicio = document.getElementById("conceptoServicio").value;
    var estadoPago = document.getElementById("estadoPago").value;
    var descuento = document.getElementById("descuento").value;

    // Calcular la fecha de vencimiento automáticamente (30 días después de la emisión)
    var fechaVencimiento = new Date();
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);
    fechaVencimiento = fechaVencimiento.toISOString().split("T")[0];

    return {
        montoPagar,
        fechaEmision,
        metodoPago,
        conceptoServicio,
        estadoPago,
        descuento,
        fechaVencimiento
    };
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("montoPagar").value = "";
    document.getElementById("metodoPago").value = "Efectivo";
    document.getElementById("conceptoServicio").value = "";
    document.getElementById("estadoPago").value = "Pendiente";
    document.getElementById("descuento").value = "No aplica";
    idPagoEnEdicion = null; // Reiniciar la variable global
}
// Función para guardar un nuevo pago
function guardar() {
    var datos = recuperarDatosFormulario();

    // Si hay un ID en edición, actualizamos el registro
    if (idPagoEnEdicion !== null) {
        var pagos = getJSONDeLocalStore(nombreLocalStorePagos) || [];
        var indice = buscarIndicePago(idPagoEnEdicion);

        if (indice > -1) {
            // Actualizar los datos del pago existente
            pagos[indice] = {
                idPago: idPagoEnEdicion,
                ...datos
            };
            setJSONDeLocalStore(nombreLocalStorePagos, pagos);
            mostrarPagos();
            alert("El pago ha sido actualizado con éxito!");
        } else {
            alert("No se encontró el pago a actualizar.");
        }
    } else {
        // Crear un nuevo pago
        var idAutogenerado = getValorSecuenciaPago();
        var nuevoPago = {
            idPago: idAutogenerado,
            ...datos
        };
        var pagos = getJSONDeLocalStore(nombreLocalStorePagos) || [];
        pagos.push(nuevoPago);
        setJSONDeLocalStore(nombreLocalStorePagos, pagos);
        mostrarPagos();
        alert("El pago ha sido guardado con éxito con ID: " + idAutogenerado);
    }

    limpiarFormulario();
}


// Función para buscar el índice de un pago por ID
function buscarIndicePago(id) {
    var pagos = getJSONDeLocalStore(nombreLocalStorePagos);
    return pagos.findIndex(p => p.idPago == id);
}

// Función para consultar un pago por ID
function consultar() {
    var idPago = prompt("Ingrese el ID del pago a consultar:");
    var pagos = getJSONDeLocalStore(nombreLocalStorePagos);
    var pago = pagos.find(p => p.idPago == idPago);

    if (pago) {
        document.getElementById("montoPagar").value = pago.montoPagar;
        document.getElementById("metodoPago").value = pago.metodoPago;
        document.getElementById("conceptoServicio").value = pago.conceptoServicio;
        document.getElementById("estadoPago").value = pago.estadoPago;
        document.getElementById("descuento").value = pago.descuento;
        alert("Pago encontrado. Puedes editar o guardar cambios.");
    } else {
        alert("No se encontró ningún pago con ese ID.");
    }
}

// Función para actualizar un pago existente
function actualizar() {
    var datos = recuperarDatosFormulario();
    var idPago = prompt("Ingrese el ID del pago a actualizar:");
    var pagos = getJSONDeLocalStore(nombreLocalStorePagos);
    var indice = buscarIndicePago(idPago);

    if (indice > -1) {
        pagos[indice].montoPagar = datos.montoPagar;
        pagos[indice].metodoPago = datos.metodoPago;
        pagos[indice].conceptoServicio = datos.conceptoServicio;
        pagos[indice].estadoPago = datos.estadoPago;
        pagos[indice].descuento = datos.descuento; // Descuento
        pagos[indice].fechaVencimiento = datos.fechaVencimiento; // Fecha recalculada
        setJSONDeLocalStore(nombreLocalStorePagos, pagos);
        mostrarPagos();
        alert("El pago ha sido actualizado con éxito!");
    } else {
        alert("No se encontró ningún pago con ese ID.");
    }
}

// Función para eliminar un pago
function eliminarPago(id) {
    var pagos = getJSONDeLocalStore(nombreLocalStorePagos);
    var indice = buscarIndicePago(id);

    if (indice > -1) {
        alert("Pago con ID " + id + " ha sido eliminado.");
        pagos.splice(indice, 1);
        setJSONDeLocalStore(nombreLocalStorePagos, pagos);
        mostrarPagos();
    } else {
        alert("No se encontró ningún pago con ese ID.");
    }
}

// Función para mostrar todos los pagos en una tabla
function mostrarPagos() {
    var pagos = getJSONDeLocalStore(nombreLocalStorePagos) || [];
    var tablaPagos = document.getElementById("tablaPagos");

    // Limpiar las filas existentes, excepto la cabecera
    while (tablaPagos.rows.length > 0) {
        tablaPagos.deleteRow(0);
    }

    // Añadir las filas desde el localStorage
    pagos.forEach(function(pago) {
        var fila = tablaPagos.insertRow();

        fila.insertCell(0).textContent = pago.idPago;
        fila.insertCell(1).textContent = pago.montoPagar;
        fila.insertCell(2).textContent = pago.fechaEmision;
        fila.insertCell(3).textContent = pago.metodoPago;
        fila.insertCell(4).textContent = pago.estadoPago;
        fila.insertCell(5).textContent = pago.conceptoServicio;
        fila.insertCell(6).textContent = pago.descuento;
        fila.insertCell(7).textContent = pago.fechaVencimiento;

        // Añadir botones de acción
        fila.insertCell(8).innerHTML = `
            <button class="btn btn-edit" onclick="editarPago(${pago.idPago})">Actualizar</button>
            <button class="btn btn-delete" onclick="eliminarPago(${pago.idPago})">Eliminar</button>
        `;
    });
}     

// Función para editar un pago
function editarPago(id) {
    var pagos = getJSONDeLocalStore(nombreLocalStorePagos);
    var pago = pagos.find(p => p.idPago == id);

    if (pago) {
        document.getElementById("montoPagar").value = pago.montoPagar;
        document.getElementById("metodoPago").value = pago.metodoPago;
        document.getElementById("conceptoServicio").value = pago.conceptoServicio;
        document.getElementById("estadoPago").value = pago.estadoPago;
        document.getElementById("descuento").value = pago.descuento;

        idPagoEnEdicion = id; // Guardar el ID del pago que estamos editando
        alert("Puedes actualizar los datos y luego hacer clic en GUARDAR.");
    }
}

