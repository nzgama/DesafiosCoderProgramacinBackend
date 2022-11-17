const express = require("express");
const { Router } = express;
const { engine } = require("express-handlebars");
const app = express();
const routerProductos = Router();
const port = process.env.PORT || 8080;

//SOCKET
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

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
const Contenedor = require("./ClaseContenedor");
const contenedor = new Contenedor("productos.json");

const Mensajes = require("./ClaseMensajes");
const mensajes = new Mensajes("mensajes.json");

httpServer.listen(8080, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

app.get("/", async (req, res) => {
  const products = await contenedor.getAllProducts();
  res.render("index.hbs", { products: products });
});

io.on("connection", (socket) => {
  socket.on("product", async (data) => {
    let id = 0;
    const body = data;
    const nweProductos = await contenedor.saveProducts(body);
    const products = await contenedor.getAllProducts();
    io.emit("products", products);
  });

  socket.on("show", async (data) => {
    if (data) {
      const products = await contenedor.getAllProducts();
      io.emit("products", products);
    }
  });
  /***************CHAT**************/

  socket.on("showMensajes", async (data) => {
    if (data) {
      const msgs = await mensajes.getAllMensajes();
      io.sockets.emit("msg-list", msgs);
    }
  });

  socket.on("msg", async (data) => {
    const now = new Date();
    const msgs = await mensajes.getAllMensajes();

    msgs.push({
      socketid: socket.id,
      email: data.email,
      mensaje: data.mensaje,
      fecha: `${now.toUTCString()}`,
    });

    const nweMensaje = await mensajes.saveMensajes(msgs);

    io.sockets.emit("msg-list", msgs);
  });
});
