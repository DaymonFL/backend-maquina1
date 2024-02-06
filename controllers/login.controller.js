const { response } = require("express");
const bcrypt = require("bcrypt");
const Cuentas = require('../models/cuenta.model');
const { genAdminJWT } = require ('../helpers/admin-jwt.js');
const { onelink } = require('../helpers/menu');

const login = async (req, res = response) => {
    const { usuario, contrasena } = req.body;
    console.log(usuario);
    try{
        const usuarioSys = await Cuentas.findOne({ where: { nombreUsuario: usuario } });

        if( !usuarioSys ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contreseña incorrectos'
            });
        }
        
        const validaPass = bcrypt.compareSync( contrasena, usuarioSys.contrasena );

        if( !validaPass ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña ingresada incorrecta'
            });
        }
        console.log(usuarioSys.idCuenta, usuarioSys.nombreUsuario, usuarioSys.idUsuario);
        const token = await genAdminJWT(usuarioSys.idCuenta, usuarioSys.nombreUsuario, usuarioSys.idUsuario);
        let perfil, link;
        if ( usuarioSys.tipoUsuario != 1 ){
            perfil = 2;
            link = '/usuario';
        } else {
            perfil = 1;
            link = '/admin';
        }
        const usuarioJson = [
            {
                'idCuenta': usuarioSys.idCuenta,
                'nombreUsuario': usuarioSys.nombreUsuario,
                'idUsuario': usuarioSys.idUsuario,
                'tipoUsuario': perfil,
                'estado': usuarioSys.baja,
                'jwt': token
            }
        ]

        res.json({
            ok: true,
            token,
            menu: onelink(perfil, usuarioSys.nombreUsuario),
            link,
            usuarioJson
        });

    }catch( error ){
        console.log(error);
        return res.json({
            ok: false, 
            msg: `Error desconocido al autenticar usuario: ${error}`
        });
    }
}

const renovarJWT = async (req, res = response ) => {
    const { idCuenta, nombreUsuario, idDistrito } = req;

    //Se genera JWT por datos enviados
    const token = await genAdminJWT(idCuenta, nombreUsuario, idUsuario);

    const usuarioSys = await Cuentas.findOne({ where: { idCuenta } });

    if ( !usuarioSys ){
        return res.status(401).json({
            ok: false,
            msg: `No se encontró un usuario con el dato: ${idCuenta}`
        });
    }

    res.json({
        ok: true,
        token,
        usuarioSys
    });
}

module.exports = {
    login,
    renovarJWT
}