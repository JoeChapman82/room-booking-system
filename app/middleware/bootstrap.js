const nunjucks = require('nunjucks');
const expressNunjucks = require('express-nunjucks');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');
const helmet = require('helmet');
const express = require('express');

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

    nunjucksEnv.addFilter('asMonth', (str) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(str)];
    });

    nunjucksEnv.addFilter('asDateString', (date) => {
        if(date === null || date === undefined) {
            return;
        }
        date = new Date(date);
        let formedDate = `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()}`;
        return formedDate;
    });

    nunjucksEnv.addFilter('asReadableDate', (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(date === null || date === undefined) {
            return;
        }
        if(typeof date === 'string') {
            date = new Date(date);
        }
        let formedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            return formedDate;
    });

    nunjucksEnv.addFilter('asDayMonthTime', (date) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(date === null || date === undefined) {
            return;
        }
        if(typeof date === 'string') {
            date = new Date(date);
        }
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let formedDate = `${date.getDate()} ${months[date.getMonth()]}, ${hours}:${minutes}`;
            return formedDate;
    });

    nunjucksEnv.addFilter('positionFromTop', (time) => {
        let date = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 8);
        let startPosition = ((time - date) / 1000 / 60 / 60 * 9.09);
        return `${startPosition}%`;
    });

    nunjucksEnv.addFilter('calculateHeight', (from, to) => {
        let height = ((to - from) / 1000 / 60 / 60 * 9.09);
        return `${height}%`;
    });

    nunjucksEnv.addFilter('sliceIt', (string, position, insert) => {
        return `${string.slice(0, position)}${insert}${string.slice(position)}`;
    });

    app.use(cookieParser(process.env.COOKIE_SECRET));
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
