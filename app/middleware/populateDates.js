const addDays = require('../helpers/addDays');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = (req, res, next) => {
    const isQuery = (req.query.dateYear && req.query.dateMonth && req.query.dateDay);
    const isBody = (req.body.dateYear && req.body.dateMonth && req.body.dateDay);
    const today = isQuery ? new Date(req.query.dateYear, req.query.dateMonth - 1, req.query.dateDay) : isBody ? new Date(req.body.dateYear, req.body.dateMonth - 1, req.body.dateDay) : req.body.date ? new Date(req.body.date[2], req.body.date[1] - 1, req.body.date[0]) : new Date();
    const day = today.getDay();
    const nextDay = addDays(today, day === 5 ? 3 : day === 6 ? 2 : 1);
    const previousDay = addDays(today, day === 1 ? -3 : day === 0 ? - 2 : -1);
    res.locals.today = {
        date: today,
        dateYear: req.query.dateYear || today.getFullYear(),
        dateMonth: req.query.dateMonth || today.getMonth() + 1,
        dateDay: req.query.dateDay || today.getDate(),
        formattedDate: `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()} `
    };
    res.locals.previousDay = {
        date: previousDay,
        dateYear: previousDay.getFullYear(),
        dateMonth: previousDay.getMonth() + 1,
        dateDay: previousDay.getDate(),
        formattedDate: `${previousDay.getDate()} ${months[previousDay.getMonth()]}`
    };
    res.locals.nextDay = {
        date: nextDay,
        dateYear: nextDay.getFullYear(),
        dateMonth: nextDay.getMonth() + 1,
        dateDay: nextDay.getDate(),
        formattedDate: `${nextDay.getDate()} ${months[nextDay.getMonth()]}`
    };

    res.locals.isBeforeToday = isDateBeforeToday(today);

    if(!isBody && !isQuery && !req.body.date) {
         res.locals.now = new Date();
     }


    next();
};

function isDateBeforeToday(date) {
    return new Date(date.toDateString()) < new Date(new Date().toDateString());
}
