const compra = JSON.parse(localStorage.getItem("DetalleDeCompra"));

const ticketCompra = document.querySelector("#ticketCompra");

compra.forEach((producto) => {
  let div = document.createElement("div");
  div.classList.add("recuadroProducto");
  div.innerHTML = `<h3>${producto.cantidad} x ${producto.nombre}</h3>`;
  ticketCompra.appendChild(div);
});