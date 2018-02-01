const find = require('../../model/user/read');
const create = require('../../model/user/create');
const redirects = require('../../controllers/redirects');
const renders = require('../../controllers/renders');

module.exports = {
    findAll: (req, res, next) => {
        find.all()
        .then(response => {
            res.locals.users = response;
            next();
        })
        .catch((error) => {
            console.log(error.message);
            return redirects.goneWrong(req, res);
        });
    },
    findById: (req, res, next) => {
        let toQuery = req.body.userId;
        find.byId(toQuery)
        .then(response => {
            res.locals.user = response;
            next();
        })
        .catch((error) => {
            console.log(error.message);
            return redirects.goneWrong(req, res);
        });
    },
    findByEmail: (req, res, next) => {
        find.byEmail(req.body.email)
        .then(response => {
            res.locals.user = response;
            next();
        })
        .catch((error) => {
            console.log(error.message);
            return redirects.goneWrong(req, res);
        });
    },
    findToAuthenticate: (req, res, next) => {
        find.toAuthenticate(req.body.email)
        .then(response => {
            if(response !== null) {
                res.locals.user = response;
                return next();
            } else {
                res.locals.errors = {
                    email: {msg: 'Provide a valid email'},
                    password: {msg: 'Provide a valid password'}
                };
                return renders.login(req, res);
            }
        })
        .catch((error) => {
            console.log(error.message);
            return redirects.goneWrong(req, res);
        });
    },
    create: (req, res, next) => {
        create(req.body.email, res.locals.hash, 'Admin')
        .then((response) => {
            console.log(response);
            return next();
        })
        .catch((error) => {
            console.log(error.message);
            return redirects.goneWrong(req, res);
        });
    }
};
