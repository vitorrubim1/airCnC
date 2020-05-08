const Booking = require('../models/Booking'); //TABELA

module.exports = {
    //METÓDO ASSÍNCRONA DE RESERVA 
    async store(req, res){
        const { user_id } = req.headers; //BUSCANDO O ID DO USER LOGADO PELO CABEÇALHO DE REQ
        const { spot_id } = req.params; //BUSCANDO O ID DO SPOT PELA URL 
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();//POPULANDO O NOME DO SPOT E USER AO INVÉS ID
        
        //VERIFICANDO SE O DONO DO SPOT TA ON PARA MANDAR MENSAGEM SOMENTE PRA ELE
        const ownerSocket = req.connectedUsers[booking.spot.user];

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking); 
        }

        return res.json(booking); //RETORNANDO O SPOT Q VIROU UM OBJETO
    }
};