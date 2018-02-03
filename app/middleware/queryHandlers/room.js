const requireDir = require('require-dir');
const room = requireDir('./room', {recurse: true});

const find = require('../../model/room/read');
const create = require('../../model/room/create');
const update = require('../../model/room/update');
const redirects = require('../../controllers/redirects');
const addErrorMessage = require('../../helpers/addErrorMessage');


module.exports = {
    findAll: room.findAll,
    findByName: room.findByName,
    findById: room.findById,
    create: room.create,
    updateOne: room.updateOne
};
