const express = require("express");
const { Router } = express;
const { engine } = require("express-handlebars");
const app = express();
const routerProductos = Router();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
const Contenedor = require("./ClaseContenedor");
const contenedor = new Contenedor("productos.json");

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);

app.get("/", async (req, res) => {
  const products = await contenedor.getAllProducts();
  res.render("index", { products: products });
});

routerProductos.get("/", async (req, res) => {
  const products = await contenedor.getAllProducts();
  res.render("productslist", { products: products });
});

routerProductos.post("/", async (req, res) => {
  let id = 0;
  const { body } = req;
  const productos = await contenedor.saveProducts(body);
  productos.map((item) => {
    item.id > id && (id = item.id);
  });
  res.render("exito");
});

routerProductos.get("/form", async (req, res) => {
  res.render("form");
});