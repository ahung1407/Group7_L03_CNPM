const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    id: Number,
    range: String,
    status: String,
});

const roomSchema = new mongoose.Schema({
    id: Number,
    name: String,
    slots: [slotSchema],
});

module.exports = mongoose.model('Room', roomSchema);