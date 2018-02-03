const validator = require('validator');
const renders = require('../../controllers/renders');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
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
        if(!res.locals.errors) {
            return next();
        } else {
            return redirects.book(req, res);
        }
};
