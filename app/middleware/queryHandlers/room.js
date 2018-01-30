const find = require('../../model/room/read');

module.exports = {
    findAll: (req, res, next) => {
        find.all()
        .then(response => {
            res.locals.rooms = response;
            next();
        })
        .catch(error => console.log(error.message));
    },
    findById: (req, res, next) => {
        find.byId(req.params.id)
        .then(response => {
            res.locals.room = response;
            next();
        })
        .catch(error => console.log(error.message));
    }
};
