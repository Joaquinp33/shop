//Mostrar/ocultar formulario de inicio de sesión/registro
(function () {
  $(document).ready(function () {
    $(".alt-form").click(function () {
      let formularioRegistro = document.querySelector(".formularioRegistro");
      let formularioInicioSesion = document.querySelector(
        ".formularioInicioSesion"
      );
      let registroOculto = formularioRegistro.classList.contains("ocultar");
      if (registroOculto) {
        formularioRegistro.classList.remove("ocultar");
        formularioInicioSesion.classList.add("ocultar");
      } else {
        formularioRegistro.classList.add("ocultar");
        formularioInicioSesion.classList.remove("ocultar");
      }
    });

    let formRegistro = document.getElementsByName("formulario-input");
    for (let i = 0; i < formRegistro.length; i++) {
      formRegistro[i].addEventListener("blur", function () {
        if (this.value.length >= 1) {
          this.nextElementSibling.classList.add("active");
          this.nextElementSibling.classList.remove("error");
        } else if ((this.value.length = " ")) {
          this.nextElementSibling.classList.add("error");
          this.nextElementSibling.classList.remove("active");
        } else {
          this.nextElementSibling.classList.remove("active");
        }
      });
    }
  });
})();

//Lista de cuentas registradas PREDEFINIDAS
const cuentasRegistradas = [
  {
    email: "joaquin@gmail.com",
    contrasenia: "joaquin",
  },
  {
    email: "roberto@gmail.com",
    contrasenia: "roberto",
  },
];

//Enviar las cuentas predefinidas al local Storage para su uso a la hora de iniciar sesión
function cuentasRegistradasLocalStorage() {
  for (i = 0; i < cuentasRegistradas.length; i++) {
    localStorage.setItem(
      JSON.stringify(cuentasRegistradas[i].email),
      JSON.stringify(cuentasRegistradas[i].contrasenia)
    );
  }
}

cuentasRegistradasLocalStorage();

// REGISTRAR UN USUARIO EN LA BASE DE DATOS
function escribirData(event) {
  event.preventDefault();
  let mail = document.querySelector("#reg-correo").value;
  let pass = document.querySelector("#reg-pass").value;
  let passRepeat = document.querySelector("#reg-rep-pass").value;
  if (pass !== passRepeat) {
    alert("Sus contraseñas no coinciden");
  } else {
    localStorage.setItem(JSON.stringify(mail), JSON.stringify(pass));
    alert("Estás registrado/a!");
  }
}

// INICIAR SESIÓN
function getData(event) {
  event.preventDefault();
  var usuario = document.getElementById("correo").value;
  var pass = document.getElementById("pass").value;
  const data = localStorage.getItem(`"${usuario}"`);
  const clave = `"${pass}"`;
  if (data == null || data !== clave) {
    alert("No es posible iniciar sesión. Reingrese las credenciales.");
  } else {
    alert("Estás logueado!");
  }
}