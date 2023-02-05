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
-Todas las rutas cuentas con un loggueo y se puede ver por consola los request a las rutas.
-Todos los try catch cuentan con un loggueo error que tambien se guaran en el archivo error.log
-Todas la runtas inexistentes cuentan con un loggueo warning tambien se guaran en el archivo warn.log
```

## Prueba con Gzip
```sh
-Iniciar servidor "node server.js"
-Golpear la ruta "http://localhost:8080/info".
-Revisar la consola "Network" para ver el "Size".
-Denener el servidor "Ctrl-c".
-Descomentar la linea 29 del archivo "server.js" para activar la compresion.
-iniciar servidor "node server.js"
-Golpear la ruta "http://localhost:8080/info".
-Revisar la consola "Network" para ver el "Size".
```
## Resultados con Gzip
-[Resultado compraracion](https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/gzipImg.png) - Imagen

## Prueba con prof
```sh
-Iniciar "node --prof server.js".
-Golpear la ruta "http://localhost:8080/info" con Arillery "artillery quick --count 50 -n 20 http://localhost:8081/info > result_fork.txt".
-Denener el servidor "Ctrl-c".
-Decodificar la data generada "node 'nombre del archivo generado' > isolate-result.txt".
```
## Resutado con prof
-[Resultado](https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/isolate-result.txt) - Documento

## Prueba con Autocannon & modo inspector
```sh
-Iniciar "node --inspect server.js".
-Abiri la siguiente direccion en google chrome "chrome://inspect".
-Hacer click en "Open dedicated DevTools for Node".
-Ir a la pestaña "Profiler" y hacer click en el boton "Start".
-Golpear la ruta "http://localhost:8080/info" con Autocannon "npm test" (en una nueva consola).
-Esperar que retmine Autocannon.
-Ir a la pestaña "Profiler" y hacer click en el boton "Stop".
-Denener el servidor "Ctrl-c".
```
## Resultados con Autocannon & modo inspector
-[Resultado Autocannon](https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/Autocannon.png) - Imagen
-[Resultado Inspector](https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/inspector.png) - Imagen

## Prueba con Autocannon & 0x
```sh
-Iniciar "npm start".
-Golpear la ruta "http://localhost:8080/info" con Autocannon "npm test" (en una nueva consola).
-Esperar que retmine Autocannon.
-Denener el servidor "Ctrl-c".
-Esperar que ox genere los documentos.
```
## Resultados con Autocannon & 0x
-[Resultado Autocannon](https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/Autocannon2.png) - Imagen
-[Resultado ox](https://github.com/nzgama/DesafiosCoderProgramacinBackend/blob/LoggersGzipAn%C3%A1lisisPerformance/prueba0x) - Carpeta

