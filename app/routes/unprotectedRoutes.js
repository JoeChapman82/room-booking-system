const getController = require('../controllers/getController');
const postController = require('../controllers/postController');
module.exports = (app) => {

    // general
    app.get('/', getController.index);
    app.get('/choose', getController.choose);
    app.get('/overview', getController.overview);
    app.post('/overview', postController.overview);
    app.get('/check', getController.check);
    app.post('/check', postController.check);
    app.get('/book/:id', getController.book);
    app.post('/book/:id', postController.book);
    app.post('/change-book-date/:id', postController.changeBookDate);
    app.post('/book-cancel/:id', postController.bookCancel);
    app.get('/cancel/:id', getController.cancel);
    app.post('/cancel', postController.cancel);
    app.get('/cancelled', getController.cancelled);
    // login
    app.get('/login', getController.login);
    app.post('/login', postController.login);
    // errors
    app.get('/errors/somethings-gone-wrong', getController.goneWrong);
    // logout
    app.post('/logout', postController.logout);


    // initial route
    app.get('/secret', getController.secret);

    return app;
};
