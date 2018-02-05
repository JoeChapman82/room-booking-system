const redirects = require('./redirects');
const renders = require('./renders');
const populateDates = require('../middleware/populateDates');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const queryUser = require('../middleware/queryHandlers/user');
const validate = require('../middleware/validate');
const handleInitialUser = require('../middleware/handleInitialUser');

module.exports = {
    // index: [redirects.choose],
    index: [renders.index],
    choose: [queryRoom.findAll, renders.choose],
    overview: [populateDates, queryRoom.findAll, queryBooking.findDaysBookingsAllRooms, renders.overview],
    check: [renders.check],
    book: [populateDates, queryRoom.findById, queryBooking.findDaysBookings, renders.book],
    cancel: [queryBooking.findById, queryRoom.findById, renders.cancel],
    cancelled: [renders.cancelled],
    login: [renders.login],
    goneWrong: [renders.goneWrong],

    // admin GETS
    adminHome: [renders.adminHome],
    adminBooking: [queryBooking.findById, queryRoom.findById, renders.adminBooking],
    adminCancelBooking: [queryBooking.remove, redirects.adminBookingCancelled],
    adminBookingCancelled: [renders.adminBookingCancelled],
    adminCreateRoom: [renders.adminCreateRoom],
    adminEditRoom: [queryRoom.findAll, renders.adminEditRoom],
    adminInviteUser: [renders.adminInviteUser],
    adminSearchResults: [queryBooking.findByParams, renders.adminSearchResults],
    adminNoResults: [renders.adminNoResults],

    // super GETS
    superHome: [renders.superHome],
    superSeed: [renders.superSeed],
    superInviteUser: [renders.superInviteUser],
    superCreateRoom: [renders.superCreateRoom],
    superEditRoom: [queryRoom.findAll, renders.superEditRoom],
    superCreateBooking: [renders.superCreateBooking],
    superManageUsers: [queryUser.findAll, renders.superManageUsers],
    superClearOldBookings: [renders.superClearOldBookings],

    // other GETS
    newUser: [renders.newUser],

    // initial GETS
    secret: [queryUser.findAll, handleInitialUser, redirects.index]

};
