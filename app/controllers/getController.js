const redirects = require('./redirects');
const renders = require('./renders');
const populateDates = require('../middleware/populateDates');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const queryUser = require('../middleware/queryHandlers/user');
const validate = require('../middleware/validate');
const handleInitialUser = require('../middleware/handleInitialUser');

module.exports = {
    index: [redirects.choose],
    choose: [queryRoom.findAll, renders.choose],
    book: [populateDates, queryRoom.findById, queryBooking.findDaysBookings, renders.book],
    cancel: [queryBooking.findById, queryRoom.findById, renders.cancel],
    cancelled: [renders.cancelled],
    login: [renders.login],
    goneWrong: [renders.goneWrong],

    // admin GETS
    adminHome: [renders.adminHome],

    // super GETS
    superHome: [renders.superHome],
    superSeed: [renders.superSeed],
    superInviteUser: [renders.superInviteUser],
    superCreateRoom: [renders.superCreateRoom],
    superCreateBooking: [renders.superCreateBooking],
    superManageUsers: [queryUser.findAll, renders.superManageUsers],

    // other GETS
    newUser: [renders.newUser],

    // initial GETS
    secret: [queryUser.findAll, handleInitialUser, redirects.index]

};
