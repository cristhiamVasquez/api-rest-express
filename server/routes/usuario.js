const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');


const Usuario = require('../models/usuario');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();


app.get('/usuario', verificaToken, (req, res) => {

    /*let estadoActivo = {
        estado: true
    }*/

    return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    });

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 0;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuario) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuario,
                    cantidad_registros: conteo
                })


            })
        })

});

app.post('/usuario', verificaToken, (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    //GUARDAR EN BASE DE DATOS MONGODB
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });

});

app.put('/usuario/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.delete('/usuario/:id', verificaToken, (req, res) => {


    //ACTUALIZAR EL ESTADO DEL USUARIO PARA DESHABILITARLO

    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioEliminado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioEliminado
        })


    })



    /*
        //Eliminar registro de la base de datos por ID
        let id = req.params.id;

        Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioEliminado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                });
            }

            res.json({
                ok: true,
                usuario: usuarioEliminado
            })
        })
        
        */

});


module.exports = app;