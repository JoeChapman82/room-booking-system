const create = require('../../model/booking/create');
const find = require('../../model/booking/read');
const remove = require('../../model/booking/delete');
const addDays = require('../../helpers/addDays');
const addErrorMessage = require('../../helpers/addErrorMessage');
const redirects = require('../../controllers/redirects');

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
                res.locals.booking = response;
                res.locals.bookings.push(response);
                res.locals.bookedRoom = response._id;
                res.locals.booked = true;
                return next();
            })
            .catch(error => {
                addErrorMessage(res, 'booking', 'error booking room');
                return next();
            });
    },
    superCreate: (req, res, next) => {
        const booking = {
            room: res.locals.roomId,
            start: new Date(req.body.startDate),
            end: new Date(req.body.endDate),
            name: req.body.name,
            description: req.body.description
        };
        create(booking)
        .then((response) => {
            res.locals.booking = response;
            res.locals.bookedRoom = response._id;
            res.locals.booked = true;
            return next();
        })
        .catch((error) => {
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
        .catch(error => redirects.goneWrong(req, res));
    },
    findDaysBookings: (req, res, next) => {
        const today = new Date(res.locals.today.date.getFullYear(), res.locals.today.date.getMonth(), res.locals.today.date.getDate());
        find.byDateRange(res.locals.room._id, today, addDays(today, 1))
        .then(response => {
            res.locals.bookings = response;
            return next();
        })
        .catch(error => redirects.goneWrong(req, res));
    },
    remove: (req, res, next) => {
        const toRemove = req.body.bookedRoom ? req.body.bookedRoom : req.params.id;
        remove.byId(toRemove)
        .then(response => {
            res.locals.unbooked = true;
            next();
        })
        .catch(error => redirects.goneWrong(req, res));
    },
    clearHistoric: (req, res, next) => {
        const yesterday = addDays(new Date(), -1);
        remove.byHistoricDate(yesterday)
        .then(response => {
            res.locals.cleared = true;
            next();
        })
        .catch(error => redirects.goneWrong(req, res));
    },
    handleImport: (req, res, next) => {
        let bookings = JSON.parse(res.locals.jsonBookings);
        let writesMade = 0;
        let writesToMake = bookings.length;
        importBooking();
        function importBooking() {
            const booking = {
                room: res.locals.room._id,
                start: bookings[writesMade].start,
                end: bookings[writesMade].end,
                name: bookings[writesMade].description,
                description: bookings[writesMade].description
            };
            create(booking)
            .then((response) => {
                writesMade++;
                if(writesMade === writesToMake) {
                    return next();
                } else {
                    importBooking();
                }
            })
            .catch((error) => {
                console.log(error.message);
                return redirects.goneWrong(req, res);
            });
        }
    }
};
