const requireDir = require('require-dir');
const validation = requireDir('./validation/api', {recurse: true});

module.exports = {
    getRoom: validation.getRoom,
    getBooking: validation.getBooking,
    postBookings: validation.postBookings,
    isValidRoom: validation.isValidRoom
};
