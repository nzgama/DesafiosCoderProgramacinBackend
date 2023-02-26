const Productos = require("../persistencia/productos.js");
const productos = new Productos();

async function getProductos() {
  return await productos.getAllProducts();
}

module.exports = { getProductos };
