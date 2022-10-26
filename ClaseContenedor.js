const fs = require("fs");
const express = require("express");
const app = express();
class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getRandom() {
    try {
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data[Math.floor(Math.random() * 3)])
        .catch((error) => {
          console.error("Error:", error);
        });

      return products;
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const products = fs.promises
        .readFile(`${this.archivo}`)
        .then((response) => JSON.parse(response))
        .then((data) => data)
        .catch((error) => {
          console.error("Error:", error);
        });

      return products;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Contenedor;
