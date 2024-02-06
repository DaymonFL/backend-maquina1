const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../dbconnection/config");

const Usuarios = sqlconnector.define('usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombre: {type: DataTypes.STRING},
    primerApellido: { type: DataTypes.STRING },
    segundoApellido: { type: DataTypes.STRING },
    tel: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING },
    curp: { type: DataTypes.STRING },
    fechaCreado: { type: DataTypes.DATE },
    }, 
    {
        freezeTableName: true
    });

module.exports = Usuarios;