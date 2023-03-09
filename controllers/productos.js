const { getProductos } = require("../services/productos.js");

async function index(req, res) {
  const datos = await getProductos();
  res.render("./productos/index", { products: datos });
}

async function add(req, res) {
  res.render("./productos/add");
}

module.exports = { index, add };
