const Carrito = require("../persistencia/carrito.js");
const carrito = new Carrito();

async function getCarritos() {
  return await carrito.getAllCarritos();
}

async function nuevo() {
  return await carrito.nuevoCarrito();
}

async function borrar(id) {
  return await carrito.deleteCarritos(id);
}

async function borrarProducto(carritoId, productoId) {
  return await carrito.deleteProduct(carritoId, productoId);
}

async function guardarProducto(carritoId, id) {
  return await carrito.saveProduct(carritoId, id);
}

module.exports = {
  getCarritos,
  nuevo,
  borrar,
  borrarProducto,
  guardarProducto,
};
