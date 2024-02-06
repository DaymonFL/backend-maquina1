const { response } = require("express");
const bcrypt = require('bcrypt');

const Cuentas = require('../models/cuenta.model');

const crearCuenta = async (req, res = response) =>{

    const data = req.body;
    console.log(data);
    const salto = bcrypt.genSaltSync();
    data.contrasena = bcrypt.hashSync(data.contrasena, salto);
    data.salto = salto;

    try{

        const insAdmin = await Cuentas.create(data);
        console.log(insAdmin);
        if( !insAdmin ){
            return res.status(404).json({
                ok: false,
                msg: 'Error en la creación de la cuenta - CODE[N]'
            });
        }
        res.json({
            ok: true,
            msg: 'Creacion correcta',
            insAdmin
        });
    } catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error desconocido - CODE[N]'
        });
    }

}

module.exports = {
    crearCuenta
}