const requireDir = require('require-dir');
const room = requireDir('./room', {recurse: true});

module.exports = {
    findAll: room.findAll,
    findByName: room.findByName,
    findById: room.findById,
    create: room.create,
    updateOne: room.updateOne
};
