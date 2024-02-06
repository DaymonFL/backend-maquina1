const { response } = require("express");
const bcrypt = require('bcrypt');

const Usuarios = require('../models/usuarios.model');

const ConsultaUsuarios = async (req, res = response) =>{
    const attributes = ['idUsuario', 'nombre', 'primerApellido', 'segundoApellido', 'tel', 'correo', 'curp'];
    try{
        const usuariosDB = await Usuarios.findAll({attributes});
        if( usuariosDB.length == 0 ){
            return res.status(400).json({
                ok: true,
                msg: 'Sin usuarios'
            });
        }
        return res.send({
            ok: true,
            msg: 'Se han encontrado a los usuarios ',
            usuariosDB
        });
    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error desconocido - CODE[N]'
        });
    }
}

const AgregaUsuarios = async (req, res = response) =>{
    const { idCuenta } = req;
    const data = req.body;
    try {
        console.log(data);
        const LogUsuariosDB = await Usuarios.create(data);
        if(!LogUsuariosDB){
            return res.status(500).send({
                ok: false,
                msg: 'No se ha agregado el usuario'
            });
        }
        return res.send({
            ok: true,
            msg: 'Se ha guardado el usuario'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error de conexión' 
        });
    }
}

const EditaUsuarios = async (req, res = response) =>{
    const datosPunto = req.body;
    const { idUsuario } = datosPunto;
    console.log('DATOS A ACTUALIZAR', datosPunto);
    let  where = {};
    try {
        where.idUsuario = idUsuario;
        console.log(where);
        const UsuariosDB = await Usuarios.update(datosPunto, { where: where });
        console.log(UsuariosDB);
        if(!UsuariosDB){
            return res.status(500).send({
                ok: false,
                msg: 'No se pudo actualizar la información'
            });
        }
        return res.send({
            ok: true,
            msg: 'Se actualizó la información'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error con BD'
        });
    }
}

const EliminaUsuarios = async (req, res = response) =>{
    const datosPunto = req.body;
    const { idUsuario } = datosPunto;
    console.log('DATOS A ACTUALIZAR', datosPunto);
    let  where = {};
    try {
        where.idUsuario = idUsuario;
        const UsuariosDB = await Usuarios.destroy({ where: where });
        console.log(UsuariosDB);
        if(!UsuariosDB){
            return res.status(500).send({
                ok: false,
                msg: 'No se eliminó al usuario'
            });
        }
        return res.send({
            ok: true,
            msg: 'Se elimino al usuario'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error con BD'
        });
    }
}

module.exports = {
    ConsultaUsuarios,
    AgregaUsuarios,
    EditaUsuarios,
    EliminaUsuarios
}