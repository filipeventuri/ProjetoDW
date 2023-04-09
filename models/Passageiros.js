const db = require("./db");

//acima eu estou importando as constantes de db (o "./" significa que o db está na mesma página)

const Passageiros = db.sequelize.define("Passageiros",{
    nomeCompleto:{
        type: db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.STRING
    },
    telefone:{
        type: db.Sequelize.STRING
    },
    origem:{
        type: db.Sequelize.STRING
    },
    destino:{
        type: db.Sequelize.STRING
    },
    presenca:{
        type: db.Sequelize.INTEGER
    }
});

//acima eu criei 1 vez uma tabela chamada Passageiros

 Passageiros.sync({force:false});
//acima eu garanti que a tabela será criada caso não exista uma

module.exports = Passageiros;

//acima exportei Passageiros