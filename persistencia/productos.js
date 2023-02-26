const ContenedorMongo = require("../contenedores/ContenedorMongo.js");
const productoSchema = require("../models/productos.js");

class Productos extends ContenedorMongo {
  constructor() {
    super("productos");
  }

  async getProducts(id) {
    try {
      const products = productoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllProducts() {
    try {
      const products = productoSchema
        .find()
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProducts(body) {
    try {
      const product = productoSchema({
        nombre: body.nombre,
        codigo: body.codigo,
        stock: body.stock,
        timestamp: body.timestamp,
        foto: body.foto,
        descripcion: body.descripcion,
      });
      product.save();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async editProducts(id, body) {
    try {
      const nombre = body.nombre;
      const codigo = body.codigo;
      const precio = body.precio;
      const stock = body.stock;
      const timestamp = body.timestamp;
      const foto = body.foto;
      const descripcion = body.descripcion;

      const products = productoSchema
        .updateOne(
          { _id: id },
          {
            $set: {
              nombre,
              codigo,
              precio,
              stock,
              timestamp,
              foto,
              descripcion,
            },
          }
        )
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProducts(id) {
    try {
      const products = productoSchema
        .remove({ _id: id })
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return products;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = Productos;
