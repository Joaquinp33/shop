const productosTodos = [
  {
    id: 1,
    nombre: "DRY FIT LEGEND",
    imagen: "./remeras/REMERA DRY FIT LEGEND NIKE.jpg",
    genero: "H",
    marca: "Adidas",
    talle: "L",
    precioCosto: 3000,
    cantidad: 0,
  },
  {
    id: 2,
    nombre: "CAMO FILL",
    imagen: "./remeras/REMERA CAMO FILL NIKE.jpg",
    genero: "H",
    marca: "Adidas",
    talle: "M",
    precioCosto: 3500,
    cantidad: 0,
  },
  {
    id: 3,
    nombre: "SPORT CLASH",
    imagen: "./remeras/REMERA SPORT CLASH NIKE.jpg",
    genero: "H",
    marca: "Adidas",
    talle: "L",
    precioCosto: 3250,
    cantidad: 0,
  },
];

let elementosSeleccionados = [];

function obtenerPrecioFinal(precioCosto) {
  return precioCosto + (precioCosto * 40) / 100;
}

function obtenerPrecioEfectivo(precioCosto) {
  return (obtenerPrecioFinal(precioCosto) * 90) / 100;
}

let tienda = document.querySelector(".tienda");

for (let producto of productosTodos) {
  let div = document.createElement("div");
  div.classList.add("recuadroProducto");
  div.innerHTML = `<h3>${producto.nombre}</h3>
                    <img src="${producto.imagen}"/>
                    <p>Precio final $${obtenerPrecioFinal(
                      producto.precioCosto
                    )}</p>
                    <p>Precio efectivo $${obtenerPrecioEfectivo(
                      producto.precioCosto
                    )}</p>
                    <button class="agregarAlCarrito" id=${
                      producto.id
                    }>AGREGAR AL CARRITO</button>`;
  tienda.appendChild(div);
}

const listado = document.querySelector("#carrito");
const agregarAlCarro = document.querySelectorAll(".agregarAlCarrito");
const limpiarCarrito = document.querySelector("#limpiarCarrito");
const comprar = document.querySelector("#comprar");
const montoTotal = document.querySelector("#montoTotal");
const montoEfectivo = document.querySelector("#montoEfectivo");
const quitarDelCarro = document.querySelector(".quitarDelCarro");

function existeEnCarrito(id) {
  let producto = elementosSeleccionados.find((producto) => producto.id == id);
  if (producto) {
    return true;
  }
  return false;
}

function armarListado() {
  listado.innerHTML = "";
  let ul = document.createElement("ul");
  elementosSeleccionados.forEach((producto) => {
    let li = document.createElement("li");
    li.innerHTML = `<p>${producto.cantidad} x ${producto.nombre}</p>
    <button class="quitarDelCarro" onclick="quitar(this.id)" id=${producto.id}>QUITAR</button>`;
    ul.appendChild(li);
  });
  listado.appendChild(ul);
}

agregarAlCarro.forEach((boton) => {
  boton.addEventListener("click", () => {
    let productoSeleccionado = productosTodos.find(
      (producto) => producto.id == boton.id
    );
    if (existeEnCarrito(boton.id)) {
      productoSeleccionado.cantidad += 1;
    } else {
      productoSeleccionado.cantidad = 1;
      elementosSeleccionados.push(productoSeleccionado);
    }
    armarListado();
    calcularPrecios();
  });
});

//Botón para quitar una prenda individual
function quitar(id) {
  let productoAEliminar = productosTodos.find(
    (producto) => producto.id == id
  );
  if (productoAEliminar.cantidad > 1) {
    productoAEliminar.cantidad -= 1;
  } else {
    for (let i = 0; i < elementosSeleccionados.length; i++) {
      if (i === id - 1) {
        elementosSeleccionados.splice(i, 1);
      }
    }
  }
  calcularPrecios();
  armarListado();
}

// Función que calcula el costo total y en efectivo de los objetos seleccionados
function calcularPrecios() {
  montoTotal.innerHTML = "";
  montoEfectivo.innerHTML = "";
  let total = 0;
  let totalEfectivo = 0;
  for (let i = 0; i < elementosSeleccionados.length; i++) {
    total += obtenerPrecioFinal(
      elementosSeleccionados[i].cantidad * elementosSeleccionados[i].precioCosto
    );
    totalEfectivo += obtenerPrecioEfectivo(
      elementosSeleccionados[i].cantidad * elementosSeleccionados[i].precioCosto
    );
  }
  let p = document.createElement("p");
  p.innerHTML = `${total}`;
  montoTotal.appendChild(p);
  let p1 = document.createElement("p");
  p1.innerHTML = `${totalEfectivo}`;
  montoEfectivo.appendChild(p1);
}

// Limpiar la lista de compras
limpiarCarrito.addEventListener("click", () => {
  montoTotal.innerHTML = "";
  montoEfectivo.innerHTML = "";
  elementosSeleccionados = [];
  listado.innerHTML = "";
});

// al apretar el botón COMPRAR, los elementos comprados se guardan en el local storage y se envía un Alert para confirmar la compra.
comprar.addEventListener("click", () => {
  localStorage.setItem("DetalleDeCompra", JSON.stringify(elementosSeleccionados));
  alert("Compra realizada!");
  var win = window.open("./CompraRealizada.html", '_blank');
});
