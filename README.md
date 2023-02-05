# Desafíos Coderhouse Programación Backend
## Desafío "Loggers, gzip y análisis de performance" 
## Instalación

Instale las dependencias.
```sh
-Dependencias "npm i"
-Artillery "npm i -g artillery".
-0x "npm i -g 0x".
```

## loggueo (winston)
```sh
-Todas las rutas cuentas con un loggueo y se puede ver por consola los golpres a las rutas.
-Todos los try catch cuentan con un loggueo error que tambien se guaran en el archivo error.log
-Todas la runtas inexistentes cuentan con un loggueo warning tambien se guaran en el archivo warn.log
-
```

## Prueba con Gzip
```sh
-iniciar servidor "node server.js"
-Golpear la ruta "http://localhost:8080/info".
-Revisar la consola "Network" para ver el "Size".
-Denener el servidor "Ctrl-c".
-Descomentar la linea 29 del archivo "server.js" para activar la compresion.
-iniciar servidor "node server.js"
-Golpear la ruta "http://localhost:8080/info".
-Revisar la consola "Network" para ver el "Size".
-Resultado "https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/gzipImg.png"
```

## Prueba con prof
```sh
-iniciar "node --prof server.js".
-Golpear la ruta "http://localhost:8080/info" con arillery "artillery quick --count 50 -n 20 http://localhost:8081/info > result_fork.txt".
-Denener el servidor "Ctrl-c".
-Decodificar la data generada "node 'nombre del archivo generado' > isolate-result.txt".
-iniciar servidor "node server.js"
-Golpear la ruta "http://localhost:8080/info".
-Revisar la consola "Network" para ver el "Size".
-Resultado "https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/gzipImg.png"
```


artillery quick --count 50 -n 20 http://localhost:8081/info > result_fork.txt 

node --prof-process isolate-00000222112DFD10-11816-v8.log > isolate-result.txt

node --inspect server.js

chrome://inspect


npm test


Instale las dependencias e inicie el servidor.
```sh
-Istalar npm i
-Golpear la ruta "http://localhost:8080/info".
-Revisar la consola "Network" para ver el "Size".
```
## Características
PUERTO DEL HOST
```sh
- Para elegir el puero "node server.js --port 9000"
```

INFO DEL PROYECTO
```sh
- ruta '/info' 
```
