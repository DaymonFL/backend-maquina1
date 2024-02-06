/**
 * API
 * Ruta: '/api/login'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { ConsultaUsuarios, AgregaUsuarios, EditaUsuarios, EliminaUsuarios } = require('../controllers/usuarios.controller');
const { validadorCreateItem } = require('../validators/validador');
const { validaJWT } = require('../middlewares/validar-jwt-one');
const router = Router();

router.get('/consulta',
    [
    ], ConsultaUsuarios
);

router.post('/agregar',
    [
        check('nombre', 'El nombre de usuario es obligatorio').exists().notEmpty().isLength({max:50}),
        check('primerApellido', 'El primer apellido de usuario es obligatorio').exists().notEmpty().isLength({max:50}),
        check('segundoApellido', 'El segundo apellido de usuario es obligatorio').exists().notEmpty().isLength({max:50}),
        check('tel', 'El teléfono de usuario es obligatorio').exists().notEmpty().isLength({max:10}),
        check('correo', 'El correo de usuario es obligatorio').exists().notEmpty().isLength({max:10}),
        check('curp', 'El CURP de usuario es obligatorio').exists().notEmpty().isLength({max:10}),
        validadorCreateItem, validaJWT
    ], AgregaUsuarios
);

router.post('/editar',
    [
        check('idUsuario', 'El idUsuario de usuario es obligatorio').exists().notEmpty(),
        check('nombre', 'El nombre de usuario es obligatorio').exists().notEmpty().isLength({max:50}),
        check('primerApellido', 'El primer apellido de usuario es obligatorio').exists().notEmpty().isLength({max:50}),
        check('segundoApellido', 'El segundo apellido de usuario es obligatorio').exists().notEmpty().isLength({max:50}),
        check('tel', 'El teléfono de usuario es obligatorio').exists().notEmpty().isLength({max:10}),
        check('correo', 'El correo de usuario es obligatorio').exists().notEmpty().isLength({max:10}),
        check('curp', 'El CURP de usuario es obligatorio').exists().notEmpty().isLength({max:10}),
        validadorCreateItem, validaJWT
    ], EditaUsuarios
);

router.post('/eliminar',
    [
        check('idUsuario', 'El idUsuario de usuario es obligatorio').exists().notEmpty(),
        validadorCreateItem, validaJWT
    ], EliminaUsuarios
);

module.exports = router;