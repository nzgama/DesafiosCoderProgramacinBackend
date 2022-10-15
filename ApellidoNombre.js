class Usuario {
  constructor(nombre, apellido, mascotas, libros) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = mascotas;
    this.libros = libros;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascotas() {
    return this.mascotas.length;
  }

  addBooks(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }

  getBookNames() {
    const booksName = [];
    this.libros.map((item) => {
      booksName.push(item.nombre);
    });
    return booksName;
  }
}

const usuario = new Usuario(
  "Gamal",
  "Mengarelli",
  ["Perro", "Gato"],
  [
    { nombre: "1984", autor: "George Orwell" },
    { nombre: "La naranja mecánica", autor: "Anthony Burgess" },
  ]
);

usuario.addMascota("Conejo");
usuario.addBooks("Crónicas marcianas", "Ray Bradbury");

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());
