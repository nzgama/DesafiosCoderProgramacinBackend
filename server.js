const MongoStore = require("connect-mongo");
const express = require("express");
const compression = require("compression");
const winston = require("winston");
const session = require("express-session");
const faker = require("faker");
const { engine } = require("express-handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const routes = require("./routes");
const mongoose = require("mongoose");
const { fork } = require("child_process");

require("dotenv").config();
const yargs = require("yargs/yargs")(process.argv.slice(2));
const args = yargs.default({ port: 8080 }).argv;

const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "verbose" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "warn.log", level: "warning" }),
  ],
});

const app = express();
app.use(compression());
faker.locale = "es";
const { commerce, image } = faker;

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

mongoose
  .connect(`${process.env.CONECCIONDB}`)
  .then(() => console.log("Connected to DB"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to the db";
  });

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

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

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || args.port;

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
const Usuarios = require("./models/usuarios.js");
const { stdout, stderr } = require("process");

httpServer.listen(port, () =>
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
  logger.log("info", "/ - GET");
  res.render("index.hbs", { username: req.session.user });
});

app.get("/api/productos-test", auth, (req, res) => {
  let str = [];
  try {
    for (let i = 0; i < 5; i++) {
      str.push({
        nombre: commerce.productName(),
        precio: commerce.price(100, 2000),
        foto: image.imageUrl(1234, 2345),
      });
    }
    logger.log("info", "/api/productos-test - GET");
    res.render("./layouts/productosRandom.hbs", { products: str });
  } catch (error) {
    logger.log("error", "/api/productos-test - GET");
  }
});

app.get("/info", (req, res) => {
  const info = `Argumentos de entrada:${JSON.stringify(process.argv)},
                Nombre de la plataforma:${process.platform},
                Versión de node.js: ${process.version} 
                Memoria total reservada:${JSON.stringify(
                  process.memoryUsage()
                )},
                Path de ejecución: ${process.pid}
                Process id: ${process.pid}
                Carpeta del proyecto ${process.cwd()}`;

  logger.log("info", "/info - GET");
  // logger.log("warn", "127.0.0.1 - log warn");
  // logger.log("error", "127.0.0.1 - log error");

  res.json(info);
});

// app.get("/api/randoms", (req, res) => {
//   let cant = req.query.cant ? req.query.cant : 100000000;
//   let calculo = fork("./calculo.js");
//   calculo.send(cant);
//   logger.log("info", "/api/randoms - GET");
//   calculo.on("message", (msg) => {
//     const { data, type } = msg;
//     console.log(data);
//     res.json(data);
//   });
// });

app.get("/login", routes.getLogin);

app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  routes.postLogin
);

app.get("/signup", routes.getSignup);

app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "signup" }),
  routes.postSignup
);

app.get("/faillogin", routes.getFaillogin);

app.get("/logout", routes.getLogout);

io.on("connection", (socket) => {
  socket.on("showMensajes", async (data) => {
    if (data) {
      const msgs = await mensajes.getAllMensajes();
      io.sockets.emit("msg-list", msgs);
    }
  });

  socket.on("msg", async (data) => {
    const msgs = await mensajes.getAllMensajes();
    try {
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
    } catch (error) {
      logger.log("error", "/msg - GET");
    }
  });
});
