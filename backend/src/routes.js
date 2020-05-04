const express = require('express');
const multer = require('multer');

const uploadConfig = require('./config/upload');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router(); //Router() : responsável pelas rotas do express
const upload = multer(uploadConfig);

                                //SESSIONS
routes.post('/sessions', SessionController.store); //ROTA DE CRIAÇÃO DE SESSÕES. LOGIN, LOGOUT

                                //SPOTS
routes.get('/spots', SpotController.index); //ROTA DE LISTAGEM DE SPOTS 

routes.post('/spots', upload.single('thumbnail'), SpotController.store);//ROTA DE CRIAÇÃO DE SPOTS. 
/*  upload.single('thumbanail'): SINGLE POR SER APENAS UMA IMAGEM, 
    E PASSO O CAMPO Q VAI RECEBER A IMAGEM
*/
                                //DASHBOARD
routes.get('/dashboard', DashboardController.show); //ROTA DE LISTAGEM DE SPOTS 

                                //BOOKING
routes.post('/spots/:spot_id/bookings', BookingController.store);//ROTA ENCADEADA
//PEGANDO O ID DO SPOT QUE ESTÁ SENDO RESERVADO E PASSANDO PRA ROTA BOOKING

module.exports = routes;