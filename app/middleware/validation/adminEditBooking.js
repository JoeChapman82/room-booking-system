const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
    if(validator.isEmpty(req.body.name)) {
        addErrorMessage(res, 'name', 'name is required');
    }
    if(validator.isEmpty(req.body.description)) {
        addErrorMessage(res, 'description', 'description is required');
    }
    if(validator.isEmpty(req.body.date) || req.body.date.split('/').length !== 3) {
        addErrorMessage(res, 'date', 'enter a valid date (dd/mm/yyyy)');
    }
    if(validator.isEmpty(req.body.startTime) || req.body.startTime.split(':').length !== 2) {
        addErrorMessage(res, 'startTime', 'enter a valid start time hh:mm');
    }
    if(validator.isEmpty(req.body.endTime) || req.body.endTime.split(':').length !== 2) {
        addErrorMessage(res, 'endTime', 'enter a valid start time hh:mm');
    }
    if(!res.locals.errors) {
        return next();
    } else {
        return renders.adminBooking(req, res);
    }
};
