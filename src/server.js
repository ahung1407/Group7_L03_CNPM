const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express(); // Khai báo app
app.use(cors());
app.use(express.json());

// Debug: In ra MONGO_URI để kiểm tra
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const Room = require('./models/Room');

// API để khởi tạo dữ liệu
if (process.env.INIT_DATA === 'true') {
    app.post('/api/rooms/init', async (req, res) => {
        try {
            const initialRooms = [
                {
                    id: 1,
                    name: 'H6-001',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Available' },
                        { id: 2, range: '9:00 - 11:00', status: 'Reserved' },
                        { id: 3, range: '11:00 - 13:00', status: 'Available' },
                        { id: 4, range: '13:00 - 15:00', status: 'Maintained' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Available' },
                    ],
                },
                {
                    id: 2,
                    name: 'H6-002',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Reserved' },
                        { id: 2, range: '9:00 - 11:00', status: 'Reserved' },
                        { id: 3, range: '11:00 - 13:00', status: 'Maintained' },
                        { id: 4, range: '13:00 - 15:00', status: 'Reserved' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Maintained' },
                        { id: 7, range: '19:00 - 21:00', status: 'Reserved' },
                    ],
                },
                {
                    id: 3,
                    name: 'H6-003',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Available' },
                        { id: 2, range: '9:00 - 11:00', status: 'Available' },
                        { id: 3, range: '11:00 - 13:00', status: 'Available' },
                        { id: 4, range: '13:00 - 15:00', status: 'Available' },
                        { id: 5, range: '15:00 - 17:00', status: 'Available' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Available' },
                    ],
                },
                {
                    id: 4,
                    name: 'H6-004',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Maintained' },
                        { id: 2, range: '9:00 - 11:00', status: 'Maintained' },
                        { id: 3, range: '11:00 - 13:00', status: 'Maintained' },
                        { id: 4, range: '13:00 - 15:00', status: 'Maintained' },
                        { id: 5, range: '15:00 - 17:00', status: 'Maintained' },
                        { id: 6, range: '17:00 - 19:00', status: 'Maintained' },
                        { id: 7, range: '19:00 - 21:00', status: 'Maintained' },
                    ],
                },
                {
                    id: 5,
                    name: 'H6-005',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Reserved' },
                        { id: 2, range: '9:00 - 11:00', status: 'Available' },
                        { id: 3, range: '11:00 - 13:00', status: 'Reserved' },
                        { id: 4, range: '13:00 - 15:00', status: 'Available' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Reserved' },
                    ],
                },
                {
                    id: 6,
                    name: 'H6-006',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Available' },
                        { id: 2, range: '9:00 - 11:00', status: 'Reserved' },
                        { id: 3, range: '11:00 - 13:00', status: 'Available' },
                        { id: 4, range: '13:00 - 15:00', status: 'Maintained' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Available' },
                    ],
                },
                {
                    id: 7,
                    name: 'H6-007',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Reserved' },
                        { id: 2, range: '9:00 - 11:00', status: 'Reserved' },
                        { id: 3, range: '11:00 - 13:00', status: 'Maintained' },
                        { id: 4, range: '13:00 - 15:00', status: 'Reserved' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Maintained' },
                        { id: 7, range: '19:00 - 21:00', status: 'Reserved' },
                    ],
                },
                {
                    id: 8,
                    name: 'H6-008',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Available' },
                        { id: 2, range: '9:00 - 11:00', status: 'Available' },
                        { id: 3, range: '11:00 - 13:00', status: 'Available' },
                        { id: 4, range: '13:00 - 15:00', status: 'Available' },
                        { id: 5, range: '15:00 - 17:00', status: 'Available' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Available' },
                    ],
                },
                {
                    id: 9,
                    name: 'H6-009',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Maintained' },
                        { id: 2, range: '9:00 - 11:00', status: 'Maintained' },
                        { id: 3, range: '11:00 - 13:00', status: 'Maintained' },
                        { id: 4, range: '13:00 - 15:00', status: 'Maintained' },
                        { id: 5, range: '15:00 - 17:00', status: 'Maintained' },
                        { id: 6, range: '17:00 - 19:00', status: 'Maintained' },
                        { id: 7, range: '19:00 - 21:00', status: 'Maintained' },
                    ],
                },
                {
                    id: 10,
                    name: 'H6-010',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Reserved' },
                        { id: 2, range: '9:00 - 11:00', status: 'Available' },
                        { id: 3, range: '11:00 - 13:00', status: 'Reserved' },
                        { id: 4, range: '13:00 - 15:00', status: 'Available' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Reserved' },
                    ],
                },
                {
                    id: 11,
                    name: 'H6-011',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Available' },
                        { id: 2, range: '9:00 - 11:00', status: 'Reserved' },
                        { id: 3, range: '11:00 - 13:00', status: 'Available' },
                        { id: 4, range: '13:00 - 15:00', status: 'Maintained' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Available' },
                        { id: 7, range: '19:00 - 21:00', status: 'Available' },
                    ],
                },
                {
                    id: 12,
                    name: 'H6-012',
                    slots: [
                        { id: 1, range: '7:00 - 9:00', status: 'Reserved' },
                        { id: 2, range: '9:00 - 11:00', status: 'Reserved' },
                        { id: 3, range: '11:00 - 13:00', status: 'Maintained' },
                        { id: 4, range: '13:00 - 15:00', status: 'Reserved' },
                        { id: 5, range: '15:00 - 17:00', status: 'Reserved' },
                        { id: 6, range: '17:00 - 19:00', status: 'Maintained' },
                        { id: 7, range: '19:00 - 21:00', status: 'Reserved' },
                    ],
                },
            ];

            await Room.deleteMany({});
            await Room.insertMany(initialRooms);

            res.status(201).json({ message: 'Rooms initialized successfully' });
        } catch (error) {
            console.error('Error in /api/rooms/init:', error);
            res.status(500).json({ error: error.message });
        }
    });
}

// Các API khác
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findOne({ id: req.params.id });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/rooms/:id/slots', async (req, res) => {
    try {
        const { slots } = req.body;
        const room = await Room.findOneAndUpdate(
            { id: req.params.id },
            { slots },
            { new: true }
        );
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));