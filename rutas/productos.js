const express = require("express");
const { Router } = express;
const { index, add } = require("../controllers/productos.js");

const routerProductos = new Router();

routerProductos.get("/", index);

routerProductos.get("/add", add);

module.exports = routerProductos;
