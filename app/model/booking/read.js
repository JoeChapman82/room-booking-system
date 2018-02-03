const Booking = require('./booking');

module.exports = {
    all: () => Booking.find(),
    byId: (id) => Booking.findById(id),
    byParams: (params) => Booking.find(params).limit(50).populate({path: 'room', select: 'name'}),
    byDateRange: (id, start, end) => {
        return Booking.find({room: id, start: {$gte: start}, end: {$lte: end}});
    },
};

// .populate({
//     path: 'cases',
//     match: {welshIndicator: false, supressionIndicator: true},
//     select: 'nino firstName lastName welshIndicator supressionIndicator',
//     options: { limit: 5, skip: 5 }
// });
