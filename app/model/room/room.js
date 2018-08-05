const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
        },
    equipment: [{
        type: String,
    }],
    sitting: {
        type: Number,
        required: true,
        default: 0
    },
    standing: {
        type: Number,
        required: true,
        default: 0
    },
    message: {
        type: String,
    }
});

const Room = mongoose.model('room', RoomSchema);
module.exports = Room;
