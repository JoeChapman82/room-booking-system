const Booking = require('./booking');

module.exports = {
    all: () => Booking.find(),
    byId: (id) => Booking.findById(id),
    byParams: (params) => Booking.find(params).limit(50).populate({path: 'room', select: 'name'}),
    byDateRange: (id, start, end) => {
        if(id === false) {
            return Booking.find({start: {$gte: start}, end: {$lte: end}}).populate({path: 'room', select: 'name'});
        } else {
            return Booking.find({room: id, start: {$gte: start}, end: {$lte: end}});
        }
    },
    byRoom: (roomId) => Booking.find({room: roomId}).limit(50).populate({path: 'room', select: 'name'}),
    // byRoom: (roomName) => {
    //     return Booking.find({})
    //     .populate({
    //         path: 'room',
    //         match: {name: '201'},
    //         options: {limit: 50}
    //     });
    // }
};

// .populate({
//     path: 'cases',
//     match: {welshIndicator: false, supressionIndicator: true},
//     select: 'nino firstName lastName welshIndicator supressionIndicator',
//     options: { limit: 5, skip: 5 }
// });
