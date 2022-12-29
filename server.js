const express = require("express");
const { Router } = express;
const { engine } = require("express-handlebars");

const faker = require("faker");
faker.locale = "es";
const { commerce, image } = faker;

const { writeFile } = require("fs");

//const { normalize } = require("normalizr");
//const { schema } = require("normalizr");

const app = express();
const routerProductos = Router();
const port = process.env.PORT || 8080;

//SOCKET
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//HBS
app.use(express.json());
app.use(express.static(__dirname + "/views"));
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

//CLASS
const Products = require("./ClaseProducts");
const Mensajes = require("./ClaseMensajes");
const { schema } = require("normalizr");
const { normalize } = require("normalizr");
const products = new Products();
const mensajes = new Mensajes("mensajes.json");

httpServer.listen(8080, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

app.get("/", async (req, res) => {
  res.render("index.hbs");
});

app.get("/api/productos-test", async (req, res) => {
  let str = [];
  for (let i = 0; i < 5; i++) {
    str.push({
      nombre: commerce.productName(),
      precio: commerce.price(100, 2000),
      foto: image.imageUrl(1234, 2345),
    });
  }
  res.render("./layouts/productosRandom.hbs", { products: str });
});

io.on("connection", (socket) => {
  socket.on("product", async (data) => {
    await products.saveProducts(data);
    const productsList = await products.getAllProducts();
    io.emit("products", productsList);
  });

  socket.on("showProducts", async (data) => {
    if (data) {
      let productsList = await products.getAllProducts();
      productsList == undefined &&
        (await products.createTabla(), (productsList = []));

      io.emit("products", productsList);
    }
  });

  //***************CHAT**************//

  socket.on("showMensajes", async (data) => {
    if (data) {
      const msgs = await mensajes.getAllMensajes();
      io.sockets.emit("msg-list", msgs);
    }
  });

  socket.on("msg", async (data) => {
    const msgs = await mensajes.getAllMensajes();
    if (data.mensaje) {
      msgs.push({
        author: {
          id: data.email,
          nombre: data.nombre,
          apellido: data.apellido,
          edad: data.edad,
          alias: data.alias,
          avatar: '<i class="fa fa-user" aria-hidden="true"></i>',
        },
        text: data.mensaje,
      });

      await mensajes.saveMensajes(msgs);
    }

    console.log(msgs);

    const authorSchema = new schema.Entity("author");
    const textSchema = new schema.Entity("text");

    const postSchema = {
      author: authorSchema,
      text: [textSchema],
    };
    let normalizeBlogPost;
    await msgs.forEach((element) => {
      normalizeBlogPost = normalize(element, postSchema);
      console.log(normalizeBlogPost);
    });

    io.sockets.emit("msg-list", msgs);
  });
});
