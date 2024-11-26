var nombreLocalStoreUsuarios = "usuarios";
var idUsuarioEditando = null;

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".table-container")) {
        mostrarUsuarios(); // Mostrar usuarios solo en Gestión de Usuario
    }
}); 

// Recuperar datos del formulario
function recuperarDatosFormulario() {
    var nombreUsuario = document.getElementById("nombreUsuario");
    var password = document.getElementById("password");
    var rolUsuario = document.getElementById("rolUsuario");
    var estadoDeCuenta = document.getElementById("estadoDeCuenta");
    var fechaCreacionCuenta = new Date().toISOString().split("T")[0]; // Fecha actual
    return { nombreUsuario, password, rolUsuario, estadoDeCuenta, fechaCreacionCuenta };
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("rolUsuario").value = "Medico"; // Predeterminado
    document.getElementById("estadoDeCuenta").value = "Activo"; // Predeterminado
    idUsuarioEditando = null; // Reiniciar el estado de edición
    document.getElementById("nombreUsuario").focus();
}

function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    return regex.test(password);
}

// Guardar usuario en localStorage
function guardar() {
    var datos = recuperarDatosFormulario();

    if (!datos.nombreUsuario.value || !datos.password.value) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (!validarPassword(datos.password.value)) {
        alert("La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.");
        return;
    }

    var usuarios = getJSONDeLocalStore(nombreLocalStoreUsuarios);

    if (idUsuarioEditando) {
        // Actualizar usuario existente
        var usuario = usuarios.find(u => u.idUsuario === idUsuarioEditando);
        if (usuario) {
            usuario.nombreUsuario = datos.nombreUsuario.value;
            usuario.password = datos.password.value;
            usuario.rolUsuario = datos.rolUsuario.value;
            usuario.estadoDeCuenta = datos.estadoDeCuenta.value;
            alert("Usuario actualizado con éxito.");
        }
    } else {
        // Generar un ID único para el nuevo usuario
        var idAutogenerado = usuarios.length > 0 ? usuarios[usuarios.length - 1].idUsuario + 1 : 1;

        var nuevoUsuario = {
            idUsuario: idAutogenerado,
            nombreUsuario: datos.nombreUsuario.value,
            password: datos.password.value,
            rolUsuario: datos.rolUsuario.value,
            estadoDeCuenta: datos.estadoDeCuenta.value,
            fechaCreacionCuenta: datos.fechaCreacionCuenta
        };

        // Agregar el nuevo usuario
        usuarios.push(nuevoUsuario);
        alert("Usuario registrado con éxito.");
    }

    // Guardar en localStorage
    setJSONDeLocalStore(nombreLocalStoreUsuarios, usuarios);

    // Limpiar el formulario y actualizar la tabla
    limpiarFormulario();
    mostrarUsuarios();
}

// Mostrar usuarios en la tabla
function mostrarUsuarios() {
    var usuarios = getJSONDeLocalStore(nombreLocalStoreUsuarios);
    var tabla = document.querySelector(".table-container table tbody");

    if (!tabla) return;

    // Limpiar la tabla
    tabla.innerHTML = "";

    // Agregar usuarios desde localStorage
    usuarios.forEach(function (usuario) {
        var fila = tabla.insertRow();

        fila.insertCell(0).textContent = usuario.idUsuario;
        fila.insertCell(1).textContent = usuario.nombreUsuario;
        fila.insertCell(2).textContent = usuario.password;
        fila.insertCell(3).textContent = usuario.rolUsuario;
        fila.insertCell(4).textContent = usuario.estadoDeCuenta;
        fila.insertCell(5).textContent = usuario.fechaCreacionCuenta;
        fila.insertCell(6).innerHTML = `
            <button class="btn btn-edit" onclick="editarUsuario(${usuario.idUsuario})">Actualizar</button>
            <button class="btn btn-delete" onclick="eliminarUsuario(${usuario.idUsuario})">Eliminar</button>
        `;
    });
}

// Editar usuario
function editarUsuario(id) {
    var usuarios = getJSONDeLocalStore(nombreLocalStoreUsuarios);
    var usuario = usuarios.find(u => u.idUsuario === id);

    if (usuario) {
        // Cargar los datos en el formulario
        document.getElementById("nombreUsuario").value = usuario.nombreUsuario;
        document.getElementById("password").value = usuario.password;
        document.getElementById("rolUsuario").value = usuario.rolUsuario;
        document.getElementById("estadoDeCuenta").value = usuario.estadoDeCuenta;

        // Establecer el ID en edición
        idUsuarioEditando = id;

        alert("Usuario cargado para edición. Modifica los datos y haz clic en Guardar.");
    } else {
        alert("No se encontró el usuario a editar.");
    }
}

// Eliminar usuario
function eliminarUsuario(id) {
    var usuarios = getJSONDeLocalStore(nombreLocalStoreUsuarios);
    var indice = usuarios.findIndex(u => u.idUsuario === id);

    if (indice > -1) {
        if (confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${id}?`)) {
            usuarios.splice(indice, 1);
            setJSONDeLocalStore(nombreLocalStoreUsuarios, usuarios);
            mostrarUsuarios();
            alert("Usuario eliminado con éxito.");
        }
    } else {
        alert("No se encontró el usuario a eliminar.");
    }
}

// Obtener datos de localStorage
function getJSONDeLocalStore(clave) {
    var datos = localStorage.getItem(clave);
    return datos ? JSON.parse(datos) : [];
}

// Guardar datos en localStorage
function setJSONDeLocalStore(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
}
