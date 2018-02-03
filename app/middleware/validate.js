const validator = require('validator');
const renders = require('../controllers/renders');
const redirects = require('../controllers/redirects');
const addErrorMessage = require('../helpers/addErrorMessage');
const hasConflictingTimes = require('../helpers/hasConflictingTimes');

// TODO pull these out to seperate files

module.exports = {
    choose: (req, res, next) => {
        next();
    },
    login: (req, res, next) => {
        if(validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
            addErrorMessage(res, 'email', 'provide a valid email');
        }
        if(validator.isEmpty(req.body.password) || req.body.password.length < 8) {
            addErrorMessage(res, 'password', 'provide your password');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.login(req, res);
        }
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
    },
    superCreateBooking: (req, res, next) => {
        let validRoom = false;
        res.locals.rooms.forEach((room) => {
            if(room.name.toUpperCase() === req.body.roomName.toUpperCase()) {
                validRoom = true;
                res.locals.roomId = room._id;
            }
        });
        if(validator.isEmpty(req.body.startDate) || isNaN(new Date(req.body.startDate).getFullYear())) {
            addErrorMessage(res, 'startDate', 'provide a valid date');
        }
        if(validator.isEmpty(req.body.endDate) || isNaN(new Date(req.body.endDate).getFullYear())) {
            addErrorMessage(res, 'endDate', 'provide a valid date');
        }
        if(validator.isEmpty(req.body.roomName) || !validRoom) {
            addErrorMessage(res, 'roomName', 'provide a valid room');
        }
        if(validator.isEmpty(req.body.name)) {
            addErrorMessage(res, 'name', 'provide a name');
        }
        if(validator.isEmpty(req.body.description)) {
            addErrorMessage(res, 'description', 'provide a description');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.superCreateBooking(req, res);
        }
    },
    superCreateRoom: (req, res, next) => {
        req.body.equipment = Array.isArray(req.body.equipment) ? req.body.equipment : [req.body.equipment];
        if(validator.isEmpty(req.body.name)) {
            addErrorMessage(res, 'name', 'provide a room name');
        }
        if(validator.isEmpty(req.body.sitting)) {
            addErrorMessage(res, 'sitting', 'provide sitting capacity');
        }
        if(validator.isEmpty(req.body.standing)) {
            addErrorMessage(res, 'standing', 'provide standing capacity');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.superCreateRoom(req, res);
        }
    },
    adminCreateRoom: (req, res, next) => {
        req.body.equipment = Array.isArray(req.body.equipment) ? req.body.equipment : [req.body.equipment];
        if(validator.isEmpty(req.body.name)) {
            addErrorMessage(res, 'name', 'provide a room name');
        }
        if(validator.isEmpty(req.body.sitting)) {
            addErrorMessage(res, 'sitting', 'provide sitting capacity');
        }
        if(validator.isEmpty(req.body.standing)) {
            addErrorMessage(res, 'standing', 'provide standing capacity');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.adminCreateRoom(req, res);
        }
    },
    superInviteUser: (req, res, next) => {
        if(validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
            addErrorMessage(res, 'email', 'provide a valid email');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.superInviteUser(req, res);
        }
    },
    newUser: (req, res, next) => {
        if(validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email)) {
            addErrorMessage(res, 'email', 'provide a valid email');
        }
        if(req.body.password !== req.body.confirmPassword) {
            addErrorMessage(res, 'password', 'passwords must match');
            addErrorMessage(res, 'confirmPassword', 'passwords must match');
        }
        if(validator.isEmpty(req.body.password) || req.body.password.length < 8) {
            addErrorMessage(res, 'password', 'create a password or at least 8 characters');
        }
        if(validator.isEmpty(req.body.confirmPassword) || req.body.confirmPassword.length < 8) {
            addErrorMessage(res, 'confirmPassword', 'create a password or at least 8 characters');
        }
        if(req.body.email !== res.locals.userToken.sub.email) {
            addErrorMessage(res, 'email', 'don\'t alter your email');
        }
        if(!res.locals.errors) {
            return next();
        } else {
            return renders.newUser(req, res);
        }
    },

};
