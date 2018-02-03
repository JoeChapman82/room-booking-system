const find = require('../../model/room/read');
const create = require('../../model/room/create');
const update = require('../../model/room/update');
const redirects = require('../../controllers/redirects');
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
            res.locals.searchCriteria = response === null ? 'none' : response._id;
            next();
        })
        .catch(error => redirects.goneWrong(req, res));
    },
    findById: (req, res, next) => {
        let toQuery = res.locals.booking ? res.locals.booking.room : req.params.id;
        find.byId(toQuery)
        .then(response => {
            res.locals.room = response;
            next();
        })
        .catch(error => redirects.goneWrong(req, res));
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
            addErrorMessage(res, 'roomCreation', 'error creating room');
            return next();
        });
    },
    updateOne: (req, res, next) => {
        const toFind = {
            _id: req.body.id
        };
        const toUpdate = {
            name: req.body.name,
            equipment: [req.body.equipment[0], req.body.equipment[1]],
            sitting: req.body.sitting,
            standing: req.body.standing
        };
        update.one(toFind, toUpdate)
        .then((response) => {
            res.locals.roomEdited = true;
            return next();
        })
        .catch((error) => {
            addErrorMessage(res, 'roomEdit', 'error editing room');
            return next();
        });
    }
};
