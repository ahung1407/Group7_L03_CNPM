const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Lấy toàn bộ phòng học (bao gồm tất cả timeslot)
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Lấy tất cả timeslot của 1 phòng (theo classId)
router.get('/rooms/:classId', async (req, res) => {
    try {
        const rooms = await Room.find({ classId: req.params.classId });
        if (!rooms.length) return res.status(404).json({ message: 'Room not found' });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Cập nhật trạng thái timeslot theo _id
router.put('/rooms/slot/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const room = await Room.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!room) return res.status(404).json({ message: 'Timeslot not found' });
        res.json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;