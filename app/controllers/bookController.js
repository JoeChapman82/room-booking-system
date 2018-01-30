const async = require('async');
const redirects = require('./redirects');
const renders = require('./renders');
const populateDates = require('../middleware/populateDates');
const queryRoom = require('../middleware/queryHandlers/room');
const queryBooking = require('../middleware/queryHandlers/booking');
const validate = require('../middleware/validate');

module.exports = (req, res, next) => {
    console.log(req.body);
    let middleware = [];
    switch(req.body.submit) {
        case 'submit': {
            [populateDates, queryRoom.findById, queryBooking.findDaysBookings, validate.requestBooking, queryBooking.create, renders.book]
            .forEach(o => middleware.push(o.bind(null, req, res)));
            break;
        }
        case 'Change date': {
            [validate.changeDate, populateDates, queryRoom.findById, queryBooking.findDaysBookings, renders.book]
            .forEach(o => middleware.push(o.bind(null, req, res)));
            break;
        }
        case 'Undo': {
            [queryBooking.remove, populateDates, queryRoom.findById, queryBooking.findDaysBookings, renders.book]
            .forEach(o => middleware.push(o.bind(null, req, res)));
            break;
        }
        default: {
            return redirects.index(req, res);
        }
    }
    async.series(middleware, (err) => {
        if(err) {
            return next(err);
        }
        next();
    });
};
