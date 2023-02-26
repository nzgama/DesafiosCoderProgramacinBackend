const mongoose = require("mongoose");

const uri =
  "mongodb+srv://gamal:k7mkUTu7XBAOeWfp@cluster0.6j5lnox.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("conectado a mongodb"))
  .catch((e) => console.log("error de conexión", e));

class ContenedorMongo {
  constructor(coleccion) {
    this.coleccion = coleccion;
  }
}

module.exports = ContenedorMongo;
