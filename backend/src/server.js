const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); //PARA LIDAR COM CAMINHOS

const routes = require('./routes'); //rotas 

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-gtobq.mongodb.net/semana09?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

app.use(cors()); //PERMITINDO Q O FRONTEND ACESSE A API
app.use(express.json()); //PARA O EXPRESS ENTENDER REQUISIÇÕES JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //PARA RETORNAR ARQUIVOS ESTÁTICOS, NESSA CASO A IMAGEM
app.use(routes); //USANDO AS ROTAS

app.listen(3333);