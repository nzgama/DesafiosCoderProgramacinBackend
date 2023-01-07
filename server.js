const MongoStore = require("connect-mongo");
const express = require("express");
const session = require("express-session");
const faker = require("faker");
const { engine } = require("express-handlebars");
const app = express();

faker.locale = "es";
const { commerce, image } = faker;

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://gamal:k7mkUTu7XBAOeWfp@cluster0.6j5lnox.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

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
const Mensajes = require("./ClaseMensajes");
const mensajes = new Mensajes("mensajes.json");

httpServer.listen(8080, () =>
  console.log(`Example app listening on port http://localhost:${port}`)
);

const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.render("./layouts/login.hbs");
  }
};

app.get("/", auth, (req, res) => {
  res.render("index.hbs", { username: req.session.user });
});

app.get("/api/productos-test", auth, (req, res) => {
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

app.get("/login", (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.render("./layouts/hello.hbs", { username: req.session.user });
});

app.get("/logout", (req, res) => {
  const oldUser = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("./layouts/bye.hbs", { username: oldUser });
    }
  });
});

io.on("connection", (socket) => {
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
    io.sockets.emit("msg-list", msgs);
  });
});
