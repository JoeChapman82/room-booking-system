const Booking = require('./booking');

module.exports = {
    byId: (id) => Booking.findByIdAndRemove(id),
};
