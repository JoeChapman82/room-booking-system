const User = require('./user');

module.exports = {
    all: () => User.find({}, 'email role'),
    byId: (id) => User.findById(id),
    byEmail: (email) => User.findOne({email: email}, 'email'),
    toAuthenticate: (email) => User.findOne({email: email})
};
