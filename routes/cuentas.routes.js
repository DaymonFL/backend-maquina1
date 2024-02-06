/**
 * API
 * Ruta: '/api/admin'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { crearCuenta } = require('../controllers/cuentas.controller');
const { validadorCreateItem } = require('../validators/validador');
const router = Router();

router.post('/crear-cuenta',
    [
        check('nombreUsuario', 'Es obligatorio el username').exists().notEmpty().isLength({min: 4, max:80}),
        check('contrasena', 'Es obligatorio una contraseña').exists().notEmpty(),
        validadorCreateItem
    ],
    crearCuenta
);

module.exports = router;