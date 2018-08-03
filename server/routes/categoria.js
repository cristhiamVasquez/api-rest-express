const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');


const app = express();

const Categoria = require('../models/categoria');


app.get('/categoria', verificaToken, (req, res) => {


    Categoria.find((err, categoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            categoria
        })
    })


});

app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })

});

app.post('/categoria/', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: body.usuario
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});


//Actualizar la descripcion de la categoria

app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, req.params.descripcion, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});


//Eliminar categoria de la base de datos con usuario ADMIN_ROLE
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (err, categoriaEliminada) => {

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaEliminada) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (!categoriaEliminada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada',
                    err
                }
            });
        };

        res.json({
            ok: true,
            categoria: categoriaEliminada
        })

    });

});

module.exports = app;