const requireDir = require('require-dir');
const booking = requireDir('./booking', {recurse: true});
const create = require('../../model/booking/create');
const find = require('../../model/booking/read');
const remove = require('../../model/booking/delete');
const addDays = require('../../helpers/addDays');
const addErrorMessage = require('../../helpers/addErrorMessage');
const redirects = require('../../controllers/redirects');

module.exports = {
    create: booking.create,
    superCreate: booking.superCreate,
    findById: booking.findById,
    findDaysBookings: booking.findDaysBookings,
    findByParams: booking.findByParams,
    remove: booking.remove,
    clearHistoric: booking.clearHistoric,
    handleImport: booking.handleImport,
};
