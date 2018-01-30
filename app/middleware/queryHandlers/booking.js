const create = require('../../model/booking/create');
const find = require('../../model/booking/read');
const remove = require('../../model/booking/delete');
const addDays = require('../../helpers/addDays');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = {
    create: (req, res, next) => {
            const booking = {
                room: req.body.room,
                start: new Date(req.body.date[2], req.body.date[1] - 1, req.body.date[0], req.body.FromHours, req.body.FromMinutes),
                end: new Date(req.body.date[2], req.body.date[1] - 1, req.body.date[0], req.body.UntilHours, req.body.UntilMinutes),
                name: req.body.name,
                description: req.body.reason
            };
            create(booking)
            .then(response => {
                res.locals.bookings.push(response);
                res.locals.bookedRoom = response._id;
                res.locals.booked = true;
                next();
            })
            .catch(error => {
                addErrorMessage(res, 'booking', 'error booking room');
                return next();
            });
    },
    findById: (req, res, next) => {
        find.byId(req.params.id)
        .then(response => {
            res.locals.booking = response;
            next();
        })
        .catch(error => console.log(error.message));
    },
    findDaysBookings: (req, res, next) => {
        const today = new Date(res.locals.today.date.getFullYear(), res.locals.today.date.getMonth(), res.locals.today.date.getDate());
        find.byDateRange(res.locals.room._id, today, addDays(today, 1))
        .then(response => {
            res.locals.bookings = response;
            next();
        })
        .catch(error => {
            console.log(error.message);
        });
    },
    remove: (req, res, next) => {
        console.log(req.body);
        remove.byId(req.body.bookedRoom)
        .then(response => {
            res.locals.unbooked = true;
            console.log(response);
            next();
        })
        .catch(error => {
            console.log(error.message);
        });
    }
};
