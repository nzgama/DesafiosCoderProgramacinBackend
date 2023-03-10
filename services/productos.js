const DAO = require("../models/productos.js");

const getProductos = async () => {
  return await DAO.getAllProducts();
};

module.exports = { getProductos };
