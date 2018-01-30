const Booking = require('./booking');

module.exports = {
    all: () => Booking.find(),
    byId: (id) => Booking.find({_id: id}),
    byDateRange: (id, start, end) => {
        return Booking.find({room: id, start: {$gte: start}, end: {$lte: end}});
    }
};
