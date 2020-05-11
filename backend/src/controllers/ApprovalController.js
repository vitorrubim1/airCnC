const Booking = require('../models/Booking'); //TABELA

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        //COLOCANDO O CAMPO APPROVED DO BD COM TRUE
        booking.approved = true;

        await booking.save();

        //PRA ENVIAR PRO MOBILE

        //VERIFICANDO O USUÁRIO QUE ESTA FAZENDO A RESERVA
        const bookingUserSocket = req.connectedUsers[booking.user];

        if(bookingUserSocket){
            req.io.to(bookingUserSocket).emit('booking_response', booking); 
        }

        return res.json(booking);
    }
};