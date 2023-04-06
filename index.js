const Passageiros = require("./models/Passageiros");

const Express = require("express");
const app = Express();
//acima estou habilitando o framework

const bodyParser = require("body-parser");
//acima estou habilitando o body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//acima estou configurando o body parser



const handlebars = require("express-handlebars");
//acima estou habilitando o handlebars

app.engine('handlebars', handlebars.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");
//acima estou configurando a template engine

app.get("/", function(req,res){
    res.render("homePage");
});
//acima criei uma rota para a pagina inicial

app.get("/passageiros", function(req,res){
    res.render("homePage");
});

app.get("/cad", function(req,res){
    res.render("cadastro");
});
//acima criei uma rota do tipo get para renderizar o html cadastro

app.post("/add", function(req,res){
    Passageiros.create({
        nomeCompleto: req.body.nomeCompleto,
        email: req.body.email,
        telefone: req.body.telefone
    }).then(function(){
        res.redirect("/");
    }).catch(function(erro){
        res.send("Falha ao cadastrar passageiro\n"+"Erro: "+erro);
    })
});
//acima criei uma rota do tipo post a qual adiciona os dados passados pelo formulário de action /add no banco de dados

app.listen(8081, function(){
    console.log("Server rodando");
});
//acima estou iniciando o servidor