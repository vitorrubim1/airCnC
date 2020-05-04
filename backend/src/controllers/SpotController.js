const User = require('../models/User'); 
const Spot = require('../models/Spot'); //TABELA

module.exports = {

    //METÓDO ASSÍNCRONO DE LISTAGEM
    async index(req, res){
        const { tech } = req.query; //BUSCANDO AS TECHS DA URL

        const spots = await Spot.find({ techs: tech }); //BUSCANDO A TECH NO BD
        
        return res.json(spots);
    },

    //METÓDO ASSÍNCRONO DE CRIAÇÃO
    async store(req, res){

        const { filename } = req.file; //NOME DO FILE DO ARQUIVO
        const { company, techs, price } = req.body; //BODY DA REQ
        const { user_id } = req.headers; //CABEÇALHO DA REQ

        const user = await User.findById(user_id); //BUSCANDO O USER PELO ID
        if(!user){
            return res.status(400).json({ error: 'User does not exist' }); 
        }

        const spot = await Spot.create({
            user: user_id, //id DO USER
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()), //VAI PERCORRER A STRING E SEPARAR POR VÍRGULA E TIRANDO O ESPAÇO DE ANTES E APÓS
            price
        });

        return res.json(spot); //RETORNANDO O SPOT Q VIROU UM OBJETO 
    }
}