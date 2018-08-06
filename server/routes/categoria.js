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
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
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
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
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
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {

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
            accion: {
                message: 'Categoria eliminada',
                categoria: categoriaEliminada
            }
        });

    });

});

module.exports = app;