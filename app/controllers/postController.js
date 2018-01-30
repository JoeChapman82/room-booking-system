const redirects = require('./redirects');
const renders = require('./renders');
const populateDates = require('../middleware/populateDates');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const validate = require('../middleware/validate');

module.exports = {
    cancel: [queryBooking.findById, renders.cancel]
};
