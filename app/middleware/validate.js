const validator = require('validator');
const requireDir = require('require-dir');
const validation = requireDir('./validation', {recurse: true});
const renders = require('../controllers/renders');
const redirects = require('../controllers/redirects');
const addErrorMessage = require('../helpers/addErrorMessage');
const hasConflictingTimes = require('../helpers/hasConflictingTimes');


module.exports = {
    choose: validation.choose,
    login: validation.login,
    changeDate: validation.changeDate,
    requestBooking: validation.requestBooking,
    adminCreateRoom: validation.adminCreateRoom,
    adminEditRoom: validation.adminEditRoom,
    adminEditBooking: validation.adminEditBooking,
    adminInviteUser: validation.adminInviteUser,
    adminSearchByDescription: validation.adminSearchByDescription,
    adminSearchByRoomName: validation.adminSearchByRoomName,
    superCreateBooking: validation.superCreateBooking,
    superCreateRoom: validation.superCreateRoom,
    superEditRoom: validation.superEditRoom,
    superInviteUser: validation.superInviteUser,
    newUser: validation.newUser
};
