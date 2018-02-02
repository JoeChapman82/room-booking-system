const nunjucks = require('nunjucks');
const expressNunjucks = require('express-nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const express = require('express');
const addNunjucksFilters = require('../helpers/addNunjucksFilters');

// const sanitiserConfig = require('./sanitiser/config/customSanitisers');
// const validatorConfig = require('./validator/config/customValidators');
// const config = require('../config/config');

module.exports = (app) => {

    app.set('trust proxy', 1);
    app.use(helmet({}));
    app.use(favicon(path.join(__dirname, '../assets/images/', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, '../assets/')));

    app.use(helmet.noCache({'Cache-Control': 'max-age=86400'}));
    app.set('view engine', 'njk');

    let nunjucksEnv = nunjucks.configure(path.join(__dirname, '../views/'), {
        autoescape: true,
        express: app,
        noCache: true,
        watch: true
    });

    addNunjucksFilters(nunjucksEnv);

    app.use(cookieParser(process.env.COOKIE_SECRET || 'oops, forgot the var'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded( {extended : false} ));

    // app.use(csrf({cookie: {maxAge: config.csrfLifespan, httpOnly: true, signed: true, secure: true}}));

    // app.use((req, res, next) => {
    //     res.locals._csrf = req.csrfToken();
    //     next();
    // });

    // Handles the invalid csrf error to prevent dumping a stack trace
    // app.use((err, req, res, next) => {
    //     if (err.code !== 'EBADCSRFTOKEN') {
    //         return next(err);
    //     }
    //         res.clearCookie('_csrf');
    //         res.status(403);  // TODO need to move somethings gone wrong into unprotected routes - this will be a pain
    //         res.redirect('/');
    //     });

    return app;
};
