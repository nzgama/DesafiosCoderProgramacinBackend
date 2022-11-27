const express = require("express");
const { Router } = express;
const { engine } = require("express-handlebars");
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
const products = new Products();
const mensajes = new Mensajes();

httpServer.listen(8080, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

app.get("/", async (req, res) => {
  res.render("index.hbs");
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

  socket.on("showMessages", async (data) => {
    if (data) {
      let msgs = await mensajes.getAllMensajes();
      msgs == undefined && (await mensajes.createTabla(), (msgs = []));
      io.sockets.emit("msg-list", msgs);
    }
  });

  socket.on("msg", async (data) => {
    const date = new Date().toUTCString();
    await mensajes.saveMensajes(data, date);
    const msgs = await mensajes.getAllMensajes();
    io.sockets.emit("msg-list", msgs);
  });
});
