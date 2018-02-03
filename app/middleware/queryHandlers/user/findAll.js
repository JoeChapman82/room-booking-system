const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    find.all()
    .then(response => {
        res.locals.users = response;
        next();
    })
    .catch((error) => {
        return redirects.goneWrong(req, res);
    });
};
