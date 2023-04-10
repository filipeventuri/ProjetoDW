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

app.post("/check", function(req,res){
    if( req.body.code === "delta90"){
        res.redirect("/admin");
    }else{
        res.render("homePageMsg");
    }
}); 

//acima criei uma rota para verificar o codigo de acesso e para direcionar a pagina admin

app.get("/admin", (req,res)=>{
    res.render("admin");
});

//acima criei uma rota para renderizar admin

app.get("/endCallList", (req,res)=>{
    Passageiros.update({presenca:null},{where:{}}).then(()=>{
        res.redirect("/admin");
    }).catch((erro)=>{
        res.send("Erro: "+erro);
    });
});

//acima estou resetando a callList

app.get("/callListMissing", (req,res)=>{
    Passageiros.findAll({where:{presenca:0}},{order:[['id','DESC']]}).then(function(lista){
        res.render("callListMissing", {lista:lista});
       });
});

//acima criei uma rota para exibir quem está com presenca 0

app.get("/quemSomos", function(req,res){
    res.render("quemSomos");
});
//acima criei uma rota pra pagina quem somos

app.get("/callList", function(req,res){
    Passageiros.findAll({where:{presenca:null}},{order:[['id','DESC']]}).then(function(lista){
        res.render("callList", {lista:lista});
       });
});
//acima criei uma rota para exibir quem está com presenca 1

app.get("/pass", function(req,res){
   Passageiros.findAll({order:[['id','DESC']]}).then(function(lista){
    res.render("passageiros", {lista:lista});
   });
   
});
//acima criei uma rota para renderizar a pagina passageiros e exibir todos passageiros cadastrados organizados por id de forma descrescente

app.get("/upPass", function(req,res){
    Passageiros.findAll({order:[['id','DESC']]}).then(function(lista){
     res.render("upPass", {lista:lista});
    });
    
 });

app.get("/cad", function(req,res){
    res.render("cadastro");
});
//acima criei uma rota do tipo get para renderizar o html cadastro


app.post("/add", function(req,res){
    Passageiros.create({
        nomeCompleto: req.body.nomeCompleto,
        email: req.body.email,
        telefone: req.body.telefone,
        origem: req.body.origem,
        destino: req.body.destino,
        presenca:null

    }).then(function(){
        res.render("cadastroMsg");
    }).catch(function(erro){
        res.send("Falha ao cadastrar passageiro\n"+"Erro: "+erro);
    })
});
//acima criei uma rota do tipo post a qual adiciona os dados passados pelo formulário de action /add no banco de dados

app.get("/remove/:id", function(req,res){
    Passageiros.destroy({where: {'id':req.params.id}}).then(function(){
        res.redirect("/upPass");
    }).catch(function(erro){
        res.send("Erro: " + erro);
    })
});

//acima criei uma rota do tipo get para remover um passageiro

app.get('/presente/:id', function(req, res){
    Passageiros.update({
    presenca: true
    },{where: {'id':req.params.id}}).then(function(){
    res.redirect("/callList")
    }).catch(function(err){
      console.log(err);
    })});
//acima criei uma rota do tipo get para atualizar a variavel presenca para 1
app.get('/ausente/:id', function(req, res){
        Passageiros.update({
        presenca: false
        },{where: {'id':req.params.id}}).then(function(){
        res.redirect("/callList")
        }).catch(function(err){
          console.log(err);
        })});
//acima criei uma rota do tipo get para atualizar a variavel presenca para 0 
  

app.listen(8081, function(){
    console.log("Server rodando");
});
//acima estou iniciando o servidor


//IMPORTANTE FALTA CONCERTAR O callList para WHERE presence = 1
// falta criar o botão finalizar lista de chamada e criar uma rota para o mesmo o qual exibira a lista de passageiros WHERE presence = 0;