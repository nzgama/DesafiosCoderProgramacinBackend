const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const Contenedor = require("./ClaseContenedor");
const contenedor = new Contenedor("productos.json");

app.get("/", async (req, res) => {
  res.json("Hello word!");
});

app.get("/productos", async (req, res) => {
  let productos = "Hello";
  productos = await contenedor.getAll();
  console.log(productos);
  res.json(productos);
});

app.get("/productoRandom", async (req, res) => {
  let productos = "Hello";
  productos = await contenedor.getRandom();
  console.log(productos);
  res.json(productos);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
