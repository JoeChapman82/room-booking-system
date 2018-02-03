const validator = require('validator');
const renders = require('../../controllers/renders');
const addErrorMessage = require('../../helpers/addErrorMessage');

module.exports = (req, res, next) => {
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
};
