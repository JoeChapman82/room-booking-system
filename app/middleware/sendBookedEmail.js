const notify = require('../services/notify/notify');
const mainConfig = require('../config/main');

module.exports = (req, res, next) => {
    let param = encodeURIComponent(res.locals.booking._id);
    const personalisation = {
        cancelLink: `${process.env.NODE_URI}/cancel/${param}`,
        name: req.body.name,
        roomName: res.locals.room.name,
        bookedDate: res.locals.today.dateYear.toString(),
        bookedFrom: res.locals.today.dateYear.toString(),
        bookedUntil: res.locals.today.dateYear.toString(),
        bookingDescription: req.body.reason
    };
    console.log(personalisation.cancelLink);
    notify.sendEmail(mainConfig.bookedTemplate, req.body.email, {personalisation: personalisation})
    .then(response => {
        console.log(response.body.id);
        return next();
    })
    .catch(err => {
        console.log(err.message);
        res.locals.emailFailure = `Failure:<br />error: ${err.error.errors[0].message}`;
        return next();
    });
};
