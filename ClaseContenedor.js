const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async save(title, price, thumbnail, newData) {
    let id = 0;
    try {
      fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => newProduct(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const newId = (data) => {
        data.map((item) => {
          id = item.id > id ? item.id : id;
        });
        id++;
        return id;
      };

      const newProduct = (data) => {
        id = newId(data);
        data = [
          ...data,
          { title: title, price: price, thumbnail: thumbnail, id: id },
        ];
        guardarProduct(data);
      };

      const guardarProduct = (data) => {
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
        respuesta();
      };

      const respuesta = () => {
        console.log(
          `Se a guardado exitosamente el articulo ${title} con el ID: ${id}`
        );
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getById(id) {
    try {
      fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => productFilter(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      const productFilter = (data) => {
        data.filter((item) => {
          item.id == id && respuesta(item);
        });
      };

      const respuesta = (product) => {
        console.log(`Producto encontrado:`);
        console.log(product);
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async getAll() {
    const products = fs.promises
      .readFile(`${this.archivo}`)
      .then((response) => JSON.parse(response))
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async deleteById(id) {
    try {
      fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => deletProduct(data))
        .catch((error) => {
          console.error("Error:", error);
        });

      let newData = [];

      const deletProduct = (data) => {
        data.map((item) => {
          item.id !== id && (newData = [...newData, item]);
        });

        save(newData);
      };

      const save = (newData) => {
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(newData)}`);
        respuesta();
      };

      const respuesta = () => {
        console.log(`Se a eliminado el producto con el ID: ${id}`);
      };
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteAll() {
    const data = [];
    try {
      const delet = () => {
        fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(data)}`);
        console.log("Se han eliminado todos los productos");
      };

      delet();
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

const contenedor = new Contenedor("productos.json");

contenedor.save(
  "Bicicleta",
  10500.25,
  "https://cdn2.iconfinder.com/data/icons/public-services-filledoutline/64/BICYCLE_PARKING-parking_sign-bicycles-transportation-signals-bicycle-512.png"
);

//contenedor.getById(3);

//contenedor.getAll();

//contenedor.deleteById(1);

//contenedor.deleteAll();
