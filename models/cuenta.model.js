const { DataTypes } = require("sequelize");
const { sqlconnector } = require("../dbconnection/config");

const Cuentas = sqlconnector.define('cuentas', {
    idCuenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nombreUsuario: {type: DataTypes.STRING},
    contrasena: { type: DataTypes.STRING },
    idUsuario: { type: DataTypes.INTEGER },
    tipoUsuario: { type: DataTypes.INTEGER },
    baja: { type: DataTypes.INTEGER },
    fechaCreado: { type: DataTypes.DATE },
    }, 
    {
        freezeTableName: true
    });

module.exports = Cuentas;