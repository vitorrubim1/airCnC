const Spot = require('../models/Spot'); //TABELA

module.exports = {

    //LISTAGEM ASSÍNCRONA DE SPOTS DO APP
    async show(req, res){
        const { user_id } = req.headers; //PEGANDO O ID DO USER LOGADO ATRAVÉS DO CABEÇALHO DA REQ

        const spots = await Spot.find({ user: user_id }); //BUSCANDO DO BD, AS TECHS DO USER ON

        return res.json(spots); //RETORNANDO O SPOTS Q VIROU UM OBJETO
    }
};