# Desafíos Coderhouse Programación Backend
## Desafío "Loggers, gzip y análisis de performance" 
## Instalación

Instale las dependencias.
```sh
-Dependencias "npm i"
-Artillery "npm i -g artillery".
-0x "npm i -g 0x".
```

Prueba con Gzip
```sh
-iniciar servidor node server.js
-Artillery npm i -g artillery.
```

node --prof server.js

artillery quick --count 50 -n 20 http://localhost:8081/info > result_fork.txt 

node --prof-process isolate-00000222112DFD10-11816-v8.log > isolate-result.txt


node --inspect server.js

chrome://inspect


npm test


Instale las dependencias e inicie el servidor.
```sh
-Istalar npm i
-Ejecutar en el proyecto el comando "npm start".
-Revisar la consola para acceder al "Home" de la app.
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
