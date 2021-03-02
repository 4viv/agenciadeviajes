// Importar Express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const bodyParser = require('body-parser');
const configs = require('./config');

require('dotenv').config({path : 'variables.env'});

const db = require('./config/database');
const { promises } = require('dns');

// para revisar si la BD conecto correctamente
// db.authenticate().then( () => console.log('DB Conectada'))
//                  .catch( () => console.log(error));

// Configurar Express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// Cargar una carpeta estatica llamada public
app.use(express.static('public'));

// Validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Mostrar la fecha actual y genera la ruta 
    // req.path  ->retorna la ruta despues de la /
app.use( (req, res, next) => {
    // Crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.rutaActual = req.path;
    return next();
});

// Ejecutamos el body-parse
app.use(bodyParser.urlencoded({extended: true}));
// Cargamos las rutas las rutas
app.use('/', routes() );


// Puerto y host para la app 
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('Aplicacion corriendo');
});

