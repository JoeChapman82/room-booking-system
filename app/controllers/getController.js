const redirects = require('./redirects');
const renders = require('./renders');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');

module.exports = {
    index: [redirects.choose],
    choose: [queryRoom.findAll, renders.choose],
    book: [queryRoom.findById, renders.book]
};
