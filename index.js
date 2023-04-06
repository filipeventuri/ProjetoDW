const Express = require("express");
const app = Express();
//acima estou habilitando o framework

const bodyParser = require("body-parser");
//acima estou habilitando o body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//acima estou configurando o body parser

const Sequelize = require("sequelize");
const sequelize = new Sequelize("site", "Filipe", "Omega16la@", {
    host: "localhost",
    dialect: "mysql"
});
//acima estou habilitando o sequelize para poder manipular o banco de dados "site"

const handlebars = require("express-handlebars");
//acima estou habilitando o handlebars

app.engine('handlebars', handlebars.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
//acima estou configurando a template engine

sequelize.authenticate().then(function(){
    console.log("Conectado ao banco de dados site");
}).catch(function(erro){
    console.log("falha ao se conectar ao banco de dados");
});
//acima estou verificando se me conectei ao banco de dados

/********const Passageiros = sequelize.define('Passageiros', {
    nomeCompleto:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    telefone:{
        type: Sequelize.STRING
    },

});*******/

//acima eu criei 1 vez uma tabela chamada Passageiros

/***
 Passageiros.sync({force:true});
 ***/
//acima eu garanti que a tabela foi criada

app.get("/", function(req,res){
    res.send("Funcionando!");
});
//acima criei uma rota para a pagina inicial
app.get("/cad", function(req,res){
    res.render("cadastro");
});
//acima criei uma rota para renderizar o html cadastro


app.listen(8081, function(){
    console.log("Server rodando");
});
//acima estou iniciando o servidor