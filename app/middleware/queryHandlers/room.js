const find = require('../../model/room/read');
const create = require('../../model/room/create');
const addErrorMessage = require('../../helpers/addErrorMessage');


module.exports = {
    findAll: (req, res, next) => {
        find.all()
        .then(response => {
            res.locals.rooms = response;
            next();
        })
        .catch(error => console.log(error.message));
    },
    findByName: (req, res, next) => {
        let toQuery = res.locals.roomName ? res.locals.roomName : req.body.name;
        find.byName(toQuery)
        .then(response => {
            res.locals.room = response;
            next();
        })
        .catch(error => console.log(error.message));
    },
    findById: (req, res, next) => {
        let toQuery = res.locals.booking ? res.locals.booking.room : req.params.id;
        find.byId(toQuery)
        .then(response => {
            res.locals.room = response;
            next();
        })
        .catch(error => console.log(error.message));
    },
    create: (req, res, next) => {
        if(res.locals.room !== null) {
            res.locals.errors = {name: {msg: 'don\'t create duplicate rooms'}};
            return next();
        }
        const room = {
            name: req.body.name,
            equipment: req.body.equipment,
            sitting: req.body.sitting,
            standing: req.body.standing
        };
        create(room)
        .then((response) => {
            res.locals.roomCreated = true;
            return next();
        })
        .catch((error) => {
            addErrorMessage(res, 'roomCreation', 'error booking room');
            return next();
        });
    }
};
