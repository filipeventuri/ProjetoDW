const Passageiros = require("./models/Passageiros");
//acima estou puxando a variável passageiros
const Express = require("express");
const app = Express();
//acima estou habilitando o framework

const bodyParser = require("body-parser");
//acima estou habilitando o body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//acima estou configurando o body parser

const path=require("path");
//modulo para manipular diretorios importante para usar o framework bootstrap

app.use(Express.static(path.join(__dirname,"public")));

//acima está sendo definido que a pasta public está guardando os arquivos estáticos


const handlebars = require("express-handlebars");
//acima estou habilitando o handlebars

app.engine('handlebars', handlebars.engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set("view engine", "handlebars");
//acima estou configurando a template engine
//o defaultLayout foi definido como o arquivo main e em partialsDir foi definido o caminho para a pasta partials

app.get("/", function(req,res){
    res.render("homePage");
});
//acima criei uma rota para a pagina inicial

app.get("/pass", function(req,res){
   Passageiros.findAll({order:[['id','DESC']]}).then(function(lista){
    res.render("passageiros", {lista:lista});
   });
   
});
//acima criei uma rota para renderizar a pagina passageiros e exibir todos passageiros cadastrados organizados por id de forma descrescente

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

app.get("/remove/:id", function(req,res){
    Passageiros.destroy({where: {'id':req.params.id}}).then(function(){
        res.redirect("/pass");
    }).catch(function(erro){
        res.send("Erro: " + erro);
    })
});

//acima criei uma rota do tipo get para remover um passageiro

app.listen(8081, function(){
    console.log("Server rodando");
});
//acima estou iniciando o servidor