require('./config/config');

const express = require('express');
const mongoose = require('mongoose');



const app = express();

//BODYPARSER
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//Configuracion de rutas globales
app.use(require('./routes/index'));


//Conexion a mongodb
//mongoose.connect(process.env.PORT, (err, resp) => {
mongoose.connect(process.env.URLDB, (err, resp) => {

    if (err) {
        throw err;
    } else {
        console.log('Base de datos ONLINE');
    }

});



app.listen(process.env.PORT, () => {
    console.log('escuchando el puerto: ', process.env.URLDB);
});