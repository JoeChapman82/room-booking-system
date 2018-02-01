const createUser = require('../model/user/create');
const redirects = require('../controllers/redirects');

module.exports = (req, res, next) => {
    if(res.locals.users.length === 0) {
        createUser(process.env.INITIAL_USER_EMAIL, process.env.INITIAL_USER_PASSWORD, 'Super')
        .then((response) => {
            return next();
        })
        .catch((error) => {
            return redirects.goneWrong(req, res);
        });
    } else {
        console.log('found users');
        return next();
    }
};
