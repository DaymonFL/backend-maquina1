const jwt = require('jsonwebtoken');

const genAdminJWT = ( idCuenta, nombreUsuario, idUsuario ) => {
    return new Promise ( (resolve, reject)=>{
        const payload = {idCuenta, nombreUsuario, idUsuario};
        jwt.sign( payload, process.env.JWT_SECRET_ADMIN,  
            {
                expiresIn: '8h'
            }, ( err, token ) =>{
                if(err){
                    console.log(err);
                    reject('Sin JWT');
                } else {
                    resolve(token);
                }
            }
        )

    } );
}

module.exports = {
    genAdminJWT
};