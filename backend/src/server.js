const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes'); //rotas 

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-gtobq.mongodb.net/semana09?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(express.json()); //para o express entender requisiçõe JSON
app.use(routes); //usando as rotas

app.listen(3333);