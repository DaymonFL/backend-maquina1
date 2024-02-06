/**
 * API
 * Ruta: '/api/login'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { login, renovarJWT } = require('../controllers/login.controller');
const { validadorCreateItem } = require('../validators/validador');
const { validaJWT } = require('../middlewares/validar-jwt-one');
const router = Router();

router.post('/',
    [
        check('usuario', 'El nombre de usuario es obligatorio').exists().notEmpty().isLength({min: 4, max:80}),
        check('contrasena', 'La contraseña es obligatoria para ingresar').exists().notEmpty(),
        validadorCreateItem
    ], login
);

router.get('/renueva',
    validaJWT,
    renovarJWT
);

module.exports = router;