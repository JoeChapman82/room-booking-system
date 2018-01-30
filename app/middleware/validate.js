const validator = require('validator');
const renders = require('../controllers/renders');
const redirects = require('../controllers/redirects');
const addErrorMessage = require('../helpers/addErrorMessage');
const hasConflictingTimes = require('../helpers/hasConflictingTimes');

module.exports = {
    choose: (req, res, next) => {
        next();
    },
    changeDate: (req, res, next) => {
            if(validator.isEmpty(req.body.dateDay) || !validator.isInt(req.body.dateDay, {min: 1, max: 31})) {
                req.body.dateDay = undefined;
                addErrorMessage(res, 'dateDay', 'provide a valid date');
            }
            if(validator.isEmpty(req.body.dateMonth) || !validator.isInt(req.body.dateMonth, {min: 1, max: 12})) {
                req.body.dateMonth = undefined;
                addErrorMessage(res, 'dateMonth', 'provide a valid date');
            }
            if(validator.isEmpty(req.body.dateYear) || !validator.isInt(req.body.dateYear, {min: 2000, max: 2030})) {
                req.body.dateYear = undefined;
                addErrorMessage(res, 'dateYear', 'provide a valid date');
            }
        return next();
    },
    requestBooking: (req, res, next) => {
            if(validator.isEmpty(req.body.reason)) {
                addErrorMessage(res, 'reason', 'provide a reason');
            }
            if(validator.isEmpty(req.body.name)) {
                addErrorMessage(res, 'name', 'provide your name');
            }
            if(validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
                addErrorMessage(res, 'email', 'provide a valid email');
            }
            if(validator.isEmpty(req.body.FromHours)) {
                addErrorMessage(res, 'FromHours', 'provide a valid time');
            }
            if(validator.isEmpty(req.body.UntilHours)) {
                addErrorMessage(res, 'UntilHours', 'provide a valid time');
            }
            if(validator.isEmpty(req.body.FromMinutes)) {
                addErrorMessage(res, 'FromMinutes', 'provide a valid time');
            }
            if(validator.isEmpty(req.body.UntilMinutes)) {
                addErrorMessage(res, 'UntilMinutes', 'provide a valid time');
            }
            if(!validator.isMongoId(req.body.room)) {
                return redirects.index(req, res);
            }
            if((parseInt(req.body.UntilHours) < parseInt(req.body.FromHours)) ||  (parseInt(req.body.UntilHours) === parseInt(req.body.FromHours) && parseInt(req.body.UntilMinutes) < parseInt(req.body.FromHours))) {
                addErrorMessage(res, 'UntilMinutes', 'avoid negative times');
                addErrorMessage(res, 'UntilHours', '');
                addErrorMessage(res, 'FromHours', '');
                addErrorMessage(res, 'FromMinutes', '');
            }
            if(req.body.FromHours === req.body.UntilHours && req.body.FromMinutes === req.body.UntilMinutes) {
                addErrorMessage(res, 'UntilMinutes', 'provide different times');
                addErrorMessage(res, 'UntilHours', '');
                addErrorMessage(res, 'FromHours', '');
                addErrorMessage(res, 'FromMinutes', '');
            }
            if(hasConflictingTimes({date: req.body.date, fromHours: req.body.FromHours, fromMinutes: req.body.FromMinutes, untilHours: req.body.UntilHours, untilMinutes: req.body.UntilMinutes}, res.locals.bookings)) {
                addErrorMessage(res, 'UntilMinutes', 'avoid double booking');
                addErrorMessage(res, 'UntilHours', '');
                addErrorMessage(res, 'FromHours', '');
                addErrorMessage(res, 'FromMinutes', '');
            }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.book(req, res);
        }
    }
};
