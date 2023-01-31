# Desafíos Coderhouse Programación Backend
## Desafío "Servidor con balance de carga" 
## Instalación
Instale las dependencias y pm2 de forma global e inicie el servidor.
```sh
-Instalar dependecias en el proyecto con el comando 'npm i' (Dentro de la carpeta NginxNode/public).
-Instalar pm2 de forma global 'npm install pm2 -g'.
-Resvisr que no se encuentres procesos activos 'pm2 list' && 'tasklist /fi "imagename eq nginx.exe"' detener y eleminar.
```
## Puntos del desafio
## Ejecutar el servidor modo fork && cluster
```sh
- Dentro de la carpeta NginxNode/public donde esta el server.js ejecutar estos comandos:
- Ejecutar servidor modo cluster 'pm2 start server.js --name="ServerCluster" --watch -i max -- -- 8082'.
- Ejecutar servidor modo cluster 'pm2 start server.js --name="ServerCluster" --watch -i max -- 8082' (si no funciona el anterior).
- Ejecutar servidor modo fork 'pm2 start server.js --name="ServerFork" --watch -- -- 8081'.
- Ejecutar servidor modo fork 'pm2 start server.js --name="ServerFork" --watch -- 8081' (si no funciona el anterior).
- Listar procesos por PM2 "pm2 monit" (en una nueva terminal).
```

## Probar configuraciones de Nginx para balancear cargas
```sh
- Probar ruta 'http://localhost:8081/api/randoms' el servidor escuchando en el puerto 8081 crea módulo nativo cluster desde node. 
```

## Detener y eliminar servidor modo fork && cluster
```sh
- Denetener los servidores "pm2 stop all".
- Eliminar los servidores "pm2 delete all".
```

Si hay un error con la carpeta temp o logs aca esta la solucion
https://stackoverflow.com/questions/35563834/nginx-fails-to-create-directories-on-windows-10-with-error-nginx-createfile

Si hay un error con la carpeta temp o logs aca esta la solucion
https://stackoverflow.com/questions/35563834/nginx-fails-to-create-directories-on-windows-10-with-error-nginx-createfile
