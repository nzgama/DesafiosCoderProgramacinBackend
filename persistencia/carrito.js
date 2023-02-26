const ContenedorMongo = require("../contenedores/ContenedorMongo.js");
const carritoSchema = require("../models/carritos.js");

class Carrito extends ContenedorMongo {
  constructor() {
    super("carritos");
  }

  async nuevoCarrito() {
    try {
      const carrito = carritoSchema({
        productos: [],
      });
      carrito.save();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getCarritos(id) {
    try {
      const carrito = carritoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCarritos() {
    try {
      const carrito = carritoSchema
        .find()
        .then((response) => JSON.stringify(response))
        .then((data) => JSON.parse(data))
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async saveProduct(id, productoId) {
    try {
      const carrito = carritoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => addProduct(JSON.parse(data)))
        .catch((error) => {
          console.error("Error:", error);
        });

      const addProduct = (data) => {
        data.productos.push({
          id: productoId,
        });
        update(data.productos);
      };

      const update = (productos) => {
        carritoSchema
          .updateOne(
            { _id: id },
            {
              $set: {
                productos,
              },
            }
          )
          .then((response) => response)
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id, productoId) {
    try {
      const carrito = carritoSchema
        .findById(id)
        .then((response) => JSON.stringify(response))
        .then((data) => deleteProduct(JSON.parse(data)))
        .catch((error) => {
          console.error("Error:", error);
        });

      const deleteProduct = (data) => {
        const newProduct = [];

        data.productos.forEach((element) => {
          if (element.id != productoId) {
            newProduct.push({
              id: element.id,
            });
          }
        });
        update(newProduct);
      };

      const update = (productos) => {
        carritoSchema
          .updateOne(
            { _id: id },
            {
              $set: {
                productos,
              },
            }
          )
          .then((response) => response)
          .catch((error) => {
            console.error("Error:", error);
          });
      };

      return carrito;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCarritos(id) {
    try {
      const carrito = carritoSchema
        .remove({ _id: id })
        .then((response) => response)
        .catch((error) => {
          console.error("Error:", error);
        });
      return carrito;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = Carrito;
