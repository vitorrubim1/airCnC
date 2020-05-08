const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); //PARA LIDAR COM CAMINHOS
const socketio = require('socket.io');
const http = require('http'); //NODE

const routes = require('./routes'); //ROTAS 

const app = express();
const server = http.Server(app); //PARA QUE A APLICAÇÃO OUÇA PROTOCOLOS HTTP
const io = socketio(server); //PARA QUE O SERVIDOR OUÇA PROTOCOLOS WEBSOCKET

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-gtobq.mongodb.net/semana09?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const connectedUsers = {};

io.on('connection', socket => {
    //RELACIONADO O ID DO USUÁRIO COM O ID DO SOCKET DE CONEXÃO
    const { user_id } = socket.handshake.query; //PEGO O ID DO USER, Q O FRONT MANDA
    connectedUsers[user_id] = socket.id;
});
//MIDLEWARE
app.use((req, res, next) =>{
    req.io = io; //PERMITIR ENVIAR E RECEBER MENSAGENS DO WEB E MOBILE
    req.connectedUsers = connectedUsers; //E TBM AOS USER CONECTADOS

    return next(); //PARA CONTINUAR O FLUXO DA APLICAÇÃO
});

app.use(cors()); //PERMITINDO Q O FRONTEND ACESSE A API
app.use(express.json()); //PARA O EXPRESS ENTENDER REQUISIÇÕES JSON
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); //PARA RETORNAR ARQUIVOS ESTÁTICOS, NESSA CASO A IMAGEM
app.use(routes); //USANDO AS ROTAS

server.listen(3333);