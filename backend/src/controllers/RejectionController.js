const Booking = require('../models/Booking'); //TABELA

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        //COLOCANDO O CAMPO APPROVED DO BD COM false
        booking.approved = false;

        await booking.save();

        return res.json(booking);
    }
};