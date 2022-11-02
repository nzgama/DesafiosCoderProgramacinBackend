const express = require("express");
const { Router } = express;
const app = express();
const routerProductos = Router();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Contenedor = require("./ClaseContenedor");
const contenedor = new Contenedor("productos.json");

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);

routerProductos.get("/", async (req, res) => {
  const productos = await contenedor.getAllProducts();
  res.json(productos);
});

routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await contenedor.getProducts(id);
  const response = productos ? productos : { error: "producto no encontrado" };
  res.json(response);
});

routerProductos.post("/", async (req, res) => {
  let id = 0;
  const { body } = req;
  const productos = await contenedor.saveProducts(body);
  productos.map((item) => {
    item.id > id && (id = item.id);
  });
  res.json(
    `Se a guardado exitosamente el articulo ${body.title} con el ID: ${id + 1}`
  );
});

routerProductos.put("/:id", async (req, res) => {
  let response;
  let producto;
  const { id } = req.params;
  const { body } = req;
  const productos = await contenedor.editProducts(id, body);

  productos.map((item) => {
    item.id == id && (producto = item);
  });

  response = producto
    ? `Se a editado exitosamente el articulo ID: ${id}`
    : { error: "producto no encontrado" };
  res.json(response);
});

routerProductos.delete("/:id", async (req, res) => {
  let response;
  let producto;
  const { id } = req.params;
  const productos = await contenedor.deleteProducts(id);

  productos.map((item) => {
    item.id == id && (producto = item);
  });

  response = producto
    ? `Se a eliminado exitosamente el articulo ID: ${id}`
    : { error: "producto no encontrado" };
  res.json(response);
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/newProducts", async (req, res) => {
  res.json("New Products");
});
