const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
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
};
