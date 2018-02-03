const requireDir = require('require-dir');
const user = requireDir('./user', {recurse: true});

module.exports = {
    findAll: user.findAll,
    findById: user.findById,
    findByEmail: user.findByEmail,
    findToAuthenticate: user.findToAuthenticate,
    create: user.create
};
