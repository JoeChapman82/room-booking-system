const requireDir = require('require-dir');
const booking = requireDir('./booking', {recurse: true});

module.exports = {
    create: booking.create,
    superCreate: booking.superCreate,
    findById: booking.findById,
    findDaysBookings: booking.findDaysBookings,
    findConflicts: booking.findConflicts,
    findDaysBookingsAllRooms: booking.findDaysBookingsAllRooms,
    findByParams: booking.findByParams,
    remove: booking.remove,
    clearHistoric: booking.clearHistoric,
    handleImport: booking.handleImport,
    updateOne: booking.updateOne
};
