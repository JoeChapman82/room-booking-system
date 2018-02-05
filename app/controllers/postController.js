const redirects = require('./redirects');
const renders = require('./renders');
const populateDates = require('../middleware/populateDates');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const queryUser = require('../middleware/queryHandlers/user');
const validate = require('../middleware/validate');
const passwordManager = require('../middleware/passwordManager');
const assignToken = require('../middleware/assignToken');
const findHome = require('../middleware/findHome');
const clearCookies = require('../middleware/clearCookies');
const sendInviteEmail = require('../middleware/sendInviteEmail');
const handleUpload = require('../middleware/handleUpload');
const csvConvert = require('../middleware/csvConvert');
const clearDataFile = require('../middleware/clearDataFile');
const sendBookedEmail = require('../middleware/sendBookedEmail');


module.exports = {
    book: [populateDates, queryRoom.findById, queryBooking.findDaysBookings, validate.requestBooking, queryBooking.create, sendBookedEmail, renders.book],
    check: [validate.check, queryRoom.findAll, queryBooking.findConflicts, renders.check],
    changeBookDate: [validate.changeDate, populateDates, queryRoom.findById, queryBooking.findDaysBookings, redirects.changeBookDate],
    bookCancel: [queryBooking.remove, populateDates, queryRoom.findById, queryBooking.findDaysBookings, redirects.bookCancel],
    cancel: [queryBooking.remove, redirects.cancelled],
    overview: [validate.changeDate, redirects.overview],
    login: [validate.login, queryUser.findToAuthenticate, passwordManager.comparePassword, assignToken.sessionToken, findHome],

    // admin POSTS
    adminCreateRoom: [validate.adminCreateRoom, queryRoom.findByName, queryRoom.create, renders.adminCreateRoom],
    adminEditRoom: [queryRoom.findAll, validate.adminEditRoom, queryRoom.updateOne, queryRoom.findAll, renders.adminEditRoom],
    adminEditBooking: [queryBooking.findById, queryRoom.findById, validate.adminEditBooking, queryRoom.findAll, queryBooking.updateOne, queryBooking.findById, renders.adminBooking],
    adminInviteUser: [validate.adminInviteUser, queryUser.findByEmail, assignToken.newUserToken, sendInviteEmail, renders.adminInviteUser],
    adminSearchByDescription: [validate.adminSearchByDescription, redirects.adminSearchResults],
    adminSearchByRoomName: [validate.adminSearchByRoomName, queryRoom.findByName, redirects.adminSearchResults],


    // super user POSTS
    superCreateBooking: [queryRoom.findAll, validate.superCreateBooking, queryBooking.superCreate, renders.superCreateBooking],
    superCreateRoom: [validate.superCreateRoom, queryRoom.findByName, queryRoom.create, renders.superCreateRoom],
    superEditRoom: [queryRoom.findAll, validate.superEditRoom, queryRoom.updateOne, queryRoom.findAll, renders.superEditRoom],
    superInviteUser: [validate.superInviteUser, queryUser.findByEmail, assignToken.newUserToken, sendInviteEmail, renders.superInviteUser],
    superSeed: [handleUpload, csvConvert, queryRoom.findByName, queryBooking.handleImport, clearDataFile, renders.superSeed],
    superClearOldBookings: [queryBooking.clearHistoric, renders.superClearOldBookings],
    //logout
    logout: [clearCookies, redirects.index],
    // other POSTS
    newUser: [validate.newUser, queryUser.findByEmail, passwordManager.hashPassword, queryUser.create, renders.newUser]
};
