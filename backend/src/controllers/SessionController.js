const User = require('../models/User'); //TABELA DO BD

module.exports = {
    //METÓDO ASSÍNCRONO DE CRIAÇÃO
    async store(req, res){
        const { email } = req.body;

        //VERIFICANDO SE O USER EXISTE NO DB
        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email }); //PARA CRIAR O USER 
        } 
        return res.json(user); //RETORNANDO O USER QUE VIROU UM OBJETO
    }
};