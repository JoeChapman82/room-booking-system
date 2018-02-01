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
    changeBookDate: [validate.changeDate, populateDates, queryRoom.findById, queryBooking.findDaysBookings, redirects.changeBookDate],
    bookCancel: [queryBooking.remove, populateDates, queryRoom.findById, queryBooking.findDaysBookings, redirects.bookCancel],
    cancel: [queryBooking.remove, redirects.cancelled],
    login: [validate.login, queryUser.findToAuthenticate, passwordManager.comparePassword, assignToken.sessionToken, findHome],
    // super user POSTS
    superCreateBooking: [queryRoom.findAll, validate.superCreateBooking, queryBooking.superCreate, renders.superCreateBooking],
    superCreateRoom: [validate.superCreateRoom, queryRoom.create, renders.superCreateRoom],
    superInviteUser: [validate.superInviteUser, queryUser.findByEmail, assignToken.newUserToken, sendInviteEmail, renders.superInviteUser],
    superSeed: [handleUpload, csvConvert, queryRoom.findByName, queryBooking.handleImport, clearDataFile, renders.superSeed],
    logout: [clearCookies, redirects.index],
    // other POSTS
    newUser: [validate.newUser, renders.newUser]
};
