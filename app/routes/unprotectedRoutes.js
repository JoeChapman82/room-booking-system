const getController = require('../controllers/getController');
const postController = require('../controllers/postController');
module.exports = (app) => {

    app.get('/', getController.index);
    app.get('/choose', getController.choose);
    app.get('/book/:id', getController.book);

    return app;
};
