const nombreLocalStoreMensajes = "mensajes";
let idMensajeEnEdicion = null; // Para gestionar la edición de mensajes

// Función para recuperar los datos del formulario
function recuperarDatosMensaje() {
    const remitente = document.getElementById("remitente").value.trim();
    const destinatario = document.getElementById("destinatario").value.trim();
    const contenidoMensaje = document.getElementById("contenidoMensaje").value.trim();
    const fechaHoraMensaje = new Date().toISOString(); // Fecha y hora actuales
    const estadoMensaje = "No leído"; // Estado inicial del mensaje

    return { remitente, destinatario, fechaHoraMensaje, contenidoMensaje, estadoMensaje };
}

// Función para limpiar el formulario
function limpiarFormularioMensaje() {
    document.getElementById("destinatario").value = "Medicos";
    document.getElementById("contenidoMensaje").value = "";
    idMensajeEnEdicion = null; // Reiniciar edición
}

// Función para guardar o actualizar un mensaje
function guardarMensaje() {
    const datos = recuperarDatosMensaje();

    if (!datos.remitente || !datos.destinatario || !datos.contenidoMensaje) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const mensajes = getJSONDeLocalStore(nombreLocalStoreMensajes) || [];

    if (idMensajeEnEdicion !== null) {
        // Actualizar un mensaje existente
        const indice = mensajes.findIndex(m => m.idMensaje === idMensajeEnEdicion);

        if (indice > -1) {
            mensajes[indice] = { idMensaje: idMensajeEnEdicion, ...datos };
            setJSONDeLocalStore(nombreLocalStoreMensajes, mensajes);
            alert("El mensaje ha sido actualizado con éxito.");
        } else {
            alert("No se encontró el mensaje a actualizar.");
        }
    } else {
        // Crear un nuevo mensaje
        const idAutogenerado = getValorSecuenciaMensaje(); // Generar un nuevo ID
        const nuevoMensaje = { idMensaje: idAutogenerado, ...datos };
        mensajes.push(nuevoMensaje);
        setJSONDeLocalStore(nombreLocalStoreMensajes, mensajes);
        alert("El mensaje ha sido enviado con éxito.");
    }

    limpiarFormularioMensaje();
    mostrarMensajes(datos.remitente);
}

// Función para mostrar mensajes según el remitente actual
function mostrarMensajes(remitenteActual) {
    const mensajes = getJSONDeLocalStore(nombreLocalStoreMensajes) || [];
    const tabla = document.querySelector(".table-container tbody");

    // Filtrar mensajes según el remitente actual
    const mensajesFiltrados = mensajes.filter(
        mensaje => mensaje.remitente === remitenteActual || mensaje.destinatario === remitenteActual
    );

    // Limpiar la tabla antes de agregar nuevas filas
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }

    // Agregar los mensajes filtrados a la tabla
    mensajesFiltrados.forEach(mensaje => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${mensaje.idMensaje}</td>
            <td>${mensaje.remitente}</td>
            <td>${mensaje.destinatario}</td>
            <td>${mensaje.fechaHoraMensaje}</td>
            <td>${mensaje.contenidoMensaje}</td>
            <td>${mensaje.estadoMensaje}</td>
            <td>
                <button onclick="eliminarMensaje(${mensaje.idMensaje})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para editar un mensaje
function editarMensaje(id) {
    const mensajes = getJSONDeLocalStore(nombreLocalStoreMensajes) || [];
    const mensaje = mensajes.find(m => m.idMensaje === id);

    if (mensaje) {
        document.getElementById("remitente").value = mensaje.remitente;
        document.getElementById("destinatario").value = mensaje.destinatario;
        document.getElementById("contenidoMensaje").value = mensaje.contenidoMensaje;
        idMensajeEnEdicion = id; // Configurar el ID en edición
        alert("Puedes editar los datos y luego guardar.");
    } else {
        alert("No se encontró el mensaje a editar.");
    }
}

// Función para eliminar un mensaje
function eliminarMensaje(id) {
    const mensajes = getJSONDeLocalStore(nombreLocalStoreMensajes) || [];
    const indice = mensajes.findIndex(m => m.idMensaje === id);

    if (indice > -1) {
        mensajes.splice(indice, 1);
        setJSONDeLocalStore(nombreLocalStoreMensajes, mensajes);
        alert("El mensaje ha sido eliminado con éxito.");
        mostrarMensajes(document.getElementById("remitente").value); // Mostrar mensajes actualizados
    } else {
        alert("No se encontró el mensaje a eliminar.");
    }
}

// Función para obtener el siguiente ID de mensaje
function getValorSecuenciaMensaje() {
    const secuencia = getJSONDeLocalStore("secuencia") || { ultimoIdMensaje: 0 };
    secuencia.ultimoIdMensaje += 1;
    setJSONDeLocalStore("secuencia", secuencia);
    return secuencia.ultimoIdMensaje;
}



// Inicializar la página mostrando los mensajes del remitente actual
document.addEventListener("DOMContentLoaded", () => {
    const datos = recuperarDatosMensaje();
    mostrarMensajes(datos.remitente);
});






