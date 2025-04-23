import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
    id: Number,
    range: String,
    status: String,
});

const roomSchema = new mongoose.Schema({
    id: Number,
    name: String,
    slots: [slotSchema],
    description: String
});

const Room = mongoose.model('Room', roomSchema);
export default Room;