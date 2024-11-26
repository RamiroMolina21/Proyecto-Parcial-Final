/*
 Usuarios tipo Personal Medico que es el administrador
  - Usuario: medico
  - password: 123
 
  Usuarios tipo Paciente
  - Usuario: paciente
  - password: 123
*/

function iniciarSesion() {

    var usuario = document.getElementById("usuario")
    var password = document.getElementById("password")
  
    if (usuario.value == 'paciente' && password.value == 'Paciente1*')  {
  
      window.location.href = '../html/menupaciente.html'
  
    } else if (usuario.value == 'medico' && password.value == 'Medico1*')  {
  
       window.location.href = '../html/personalmedico.html'
  
   } else {
  
      alert("Usuario y/o password errado")
      usuario.value = ''
      password.value = ''
      usuario.focus()
  
   }
      
  }