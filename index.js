require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sqlconnector } = require('./dbconnection/config');
const app = express();
const https = require('https');
const fs = require('fs');

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(express.static('uploads'));


sqlconnector
  .authenticate()
  .then(() => {
    console.log('Conexión correcta.');
  })
  .catch(err => {
    console.error('Error de conexión:', err);
  });

//Creación de una cuenta
app.use('/api/admin', require('./routes/cuentas.routes'));

//Login de una cuenta
app.use('/api/login', require('./routes/login.routes'));

//Login de una cuenta
app.use('/api/usuarios', require('./routes/usuarios.routes'));

//Desarrollo y local
// Lanzamiento del servicio
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
