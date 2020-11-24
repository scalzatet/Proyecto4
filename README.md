# Data Warehouse

Herramienta que permite a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

## Descargar el repositorio

Se necesita descargar el repositorio de GitHub. Para esto, se debe acceder al link proporcionado. Luego acceder al botón llamado Code o Código y descargar en ZIP la información. Posteriormente este archivo se debe descomprimir y abrir la carpeta en Visual Studio Code.

## Instalar dependencias

Una vez se abre el archivo descargado, se deben instalar las dependencias que se usaron a lo largo del proyecto. Para esto y una vez en Visual Studio, se debe abrir una nueva terminal y ejecutar el comando:

```bash
npm install
```

## Credenciales de usuario

Por otro lado, se debe de iniciar sesión en MySQL Workbench. En el archivo que se encuentra en la ruta Proyecto4/JS/db/index.js deberás reemplazar el usuario y contraseña que allí se indica (root, ejemplo_password), por tus credenciales para iniciar sesión en MySQL. Adicionalmente es importante aclarar que en este caso todo se realizó en el puerto 3307.

## Creación de base de datos

Se debe dirigir al archivo dbDataWarehouse.sql que se encuentra dentro de la ruta  Proyecto4/JS/db/files/ Selecciona todo su contenido, copialo y pegalo en nuevo SQL tab. El último paso es ejecutarlo para que se cree la base de datos y sus respectivas tablas.

## Iniciar el servidor

En Visual Studio, Se debe dirigir a la carpeta JS que fue descargada en los pasos previos. Luego, se debe abrir la terminal nuevamente y ejecutar el siguiente comando

```bash
node index.js
```

## Documentación 

Se debe ingresar a la carpeta Proyecto4/Front e ingresar al archivo index.html. Posteriormente se debe de iniciar sesión con datos de usuarios que se encuentran en la tabla ya ejecutada en MySQL. Tener presente que el rol 1 corresponde a administrados y el rol 2 corresponde a un usuario común.


## Endpoints

A continuación se muestra sólo un ejemplo de las peticiones realizadas:

```bash
USUARIOS
```
POST --> Login: http://localhost:7000/usuarios/login
POST --> Agregar Usuarios: http://localhost:7000/usuarios/agregar

GET --> Listar Usuarios: http://localhost:7000/usuarios/

PUT --> Actualizar Usuario: http://localhost:7000/usuarios/:id

DELETE --> Eliminar Usuario: http://localhost:7000/usuarios/:id


 
```bash
¡Puedes continuar navegando sobre la página!
```










