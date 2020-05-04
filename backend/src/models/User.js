const mongoose = require('mongoose');

//TABLE
const UserSchema = new mongoose.Schema({
    email: String, 
}); 

//É A PARTIR DAQUI QUE É CRIADO O MODEL
module.exports = mongoose.model('User', UserSchema); //NOMEIO E PASSO O SCHEMA