const onelink = (perfil, nombres)=>{
    let menu;
    if ( perfil == 1 ){
        menu = [{
            welcome:'Bienvenida o bienvenido ',
            items: [
                { id: 1, nombre: 'Agregar usuario', icon: 'mdi-card-account-details-star', link:'/nuevo'},
                { id: 2, nombre: 'Seguimiento de Usuarios', icon: 'mdi-card-account-details-star', link:'/seguimiento'},
            ]
        }];
    } else {
        menu = [{
            welcome:'Bienvenida o bienvenido ' + nombres,
            items: [
                { id: 1, nombre: 'Mis datos', icon: 'mdi-newspaper-variant-outline', link: '/seguimiento-representaciones'},
            ]
        }];
    }
    return menu;
};

module.exports = {
    onelink
}