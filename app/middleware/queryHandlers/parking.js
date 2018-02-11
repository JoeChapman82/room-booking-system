const requireDir = require('require-dir');
const parking = requireDir('./parking', {recurse: true});

module.exports = {
    create: parking.create,
    createVisitor: parking.createVisitor,
    findDaysParkings: parking.findDaysParkings,
    findDaysVisitorParkings: parking.findDaysVisitorParkings,
    checkForDoubleBooking: parking.checkForDoubleBooking,
    findById: parking.findById,
    removeById: parking.removeById
};
