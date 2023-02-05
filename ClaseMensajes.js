const fs = require("fs");
const express = require("express");
const { response } = require("express");
const { log } = require("console");
const app = express();
class Mensajes {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAllMensajes() {
    try {
      const mensajes = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      return mensajes;
    } catch (error) {
      console.error(error);
    }
  }

  async saveMensajes(msgs) {
    try {
      fs.promises.writeFile(`${this.archivo}`, `${JSON.stringify(msgs)}`);
      return products;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = Mensajes;
