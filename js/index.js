const express = require('express');
const app = express();
app.use(express.json());
const port = 7000;

const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

const rutaUsuarios = require('./rutas/usuarios');
const rutaContactos = require('./rutas/contactos');
const rutaCompanias = require('./rutas/companias');
const rutaRegionPaisCiudad = require('./rutas/ubicacion');

app.use('/usuarios', rutaUsuarios);
app.use('/contactos', rutaContactos );
app.use('/companias', rutaCompanias );
app.use('/ubicacion', rutaRegionPaisCiudad );
 


app.listen(port, ()=>{
    console.log('Servidor corriendo de manera exitosa por el puerto ' + port);
});
