const getController = require('../controllers/getController');
const postController = require('../controllers/postController');

module.exports = (app) => {
    // admin routes
    app.get('/admin/home', getController.adminHome);
    // super routes
    app.get('/super/home', getController.superHome);

    app.get('/super/seed', getController.superSeed);
    app.post('/super/seed', postController.superSeed);

    app.get('/super/invite-user', getController.superInviteUser);
    app.post('/super/invite-user', postController.superInviteUser);

    app.get('/super/create-room', getController.superCreateRoom);
    app.post('/super/create-room', postController.superCreateRoom);

    app.get('/super/create-booking', getController.superCreateBooking);
    app.post('/super/create-booking', postController.superCreateBooking);

    app.get('/super/manage-users', getController.superManageUsers);
    // app.post('/super/manage-users', postController.superManageUsers);

    // other routes
    app.get('/new-user', getController.newUser);
    app.post('/new-user', postController.newUser);
    return app;
};