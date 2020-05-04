const mongoose = require('mongoose');

//TABLE
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String], //VETOR COM VÁRIAS STRINGS
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //REFERÊNCIA DO USUÁRIO
    }
}); 

//É A PARTIR DAQUI QUE É CRIADO O MODEL
module.exports = mongoose.model('Spot', SpotSchema); //NOMEIO E PASSO O SCHEMA