const jwt = require('jsonwebtoken');

//==========================
// Verifica TOKEN
//==========================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'su token expiro',
                    err
                }
            });
        }

        req.usuario = decoded.usuario;
        next();

    });


};

//==========================
// Verifica adminRole
//==========================

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no tiene privilegios de administrador'
            }
        });
    }

};



module.exports = {
    verificaToken,
    verificaAdminRole
}