const Sequelize = require("sequelize");
const sequelize = new Sequelize("site", "root", "123456789", {
    host: "localhost",
    dialect: "mysql"
});
//acima estou habilitando o sequelize para poder manipular o banco de dados "site"

sequelize.authenticate().then(function(){
    console.log("Conectado ao banco de dados site");
}).catch(function(erro){
    console.log("falha ao se conectar ao banco de dados");
});
//acima estou verificando se me conectei ao banco de dados

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

//acima exportei as duas constantes