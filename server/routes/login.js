const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

const app = express();


app.post('/login', (req, res) => {

    res.json({
        ok: true
    });

});


module.exports = app;