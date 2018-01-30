const getController = require('../controllers/getController');
const postController = require('../controllers/postController');
const bookController = require('../controllers/bookController');
module.exports = (app) => {

    app.get('/', getController.index);
    app.get('/choose', getController.choose);
    app.get('/book/:id', getController.book);
    app.post('/book/:id', bookController);
    app.get('/cancel/:id', getController.cancel);
    app.post('/cancel/:id', postController.cancel);

    return app;
};
