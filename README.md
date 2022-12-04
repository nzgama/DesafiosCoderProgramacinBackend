# Desafíos Coderhouse Programación Backend
## Desafío "MONGODB" 
## Base de datos
Utilizar la base de datos "ecommerce".
```sh
- La copia de la base de datos se encuentra en el repositorio en la carpeta "mongoDB" con los 10 productos y mensajes cargados.
- En caso de no poder inicar, en el documento "CrearEcommerce.md" se encuentran los comando para crear la base de datos y cargar las colecciones.
- use ecommerce.
-Listar todos los documentos en cada colección "db.mensajes.find()" "db.productos.find()"
-Mostrar la cantidad de documentos almacenados en cada una de ellas "db.mensajes.estimatedDocumentCount()" "db.productos.estimatedDocumentCount()"

```
## CRUD Productos
Consultas
```sh
A) db.productos.insertOne({"title": "Reposera", "price": 5000, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"})
B1) db.productos.find({price: {$lt:1000}},{title:1,price:1,_id:0}).pretty()
B2) db.productos.find({price: {$gt:1000,$lt:3000}},{title:1,price:1,_id:0}).pretty()
B3) db.productos.find({price: {$gt:3000}},{title:1,price:1,_id:0}).pretty()
B4) db.productos.find({},{title:1,price:1,_id:0}).sort( { price: 1 } ).limit(1).skip(2).pretty()
C) db.productos.update({},{$set:{"stock":100}},{upsert:false,multi:true})
D) db.productos.update({price: {$gt:4000}},{$set:{"stock":0}},{upsert:false,multi:true})
E) db.productos.deleteMany({price: {$lt:1000}})
```

## Usuario solo lectura
Consultas
```sh
- use admin
- db.createUser({user: "pepe",pwd: "asd456",roles: [{role: "read", db: "ecommerce"}]})
- apagar servidor de base de datos y cerrar sesion de adminitrador
- inicar el servidor de base de datos con "--auth"
- inicar la sesion usario pepe "mongo -u pepe -p asd456"
```



