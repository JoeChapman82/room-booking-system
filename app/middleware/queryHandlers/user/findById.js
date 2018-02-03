const find = require('../../../model/user/read');
const redirects = require('../../../controllers/redirects');

module.exports = (req, res, next) => {
    let toQuery = req.body.userId;
    find.byId(toQuery)
    .then(response => {
        res.locals.user = response;
        next();
    })
    .catch((error) => {
        return redirects.goneWrong(req, res);
    });
};
