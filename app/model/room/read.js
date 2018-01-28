const Room = require('./room');

module.exports = {
    all: () => Room.find({}),
    byId: (id) => Room.findById(id)
};
