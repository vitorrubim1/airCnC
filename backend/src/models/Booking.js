const mongoose = require('mongoose');

//TABLE
const BookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //REFERÊNCIA DO USUÁRIO
    },
    spot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot' //REFERÊNCIA DO SPOT
    },
}); 

//É A PARTIR DAQUI QUE É CRIADO O MODEL
module.exports = mongoose.model('Booking', BookingSchema); //NOMEIO E PASSO O SCHEMA