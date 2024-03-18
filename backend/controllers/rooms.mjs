import express from 'express';
import * as room from '../models/room.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  console.log('rooms,');
  try {
    const rooms = await room.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const room = await room.getRoomById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({message: 'Room not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
router.post('/', async (req, res) => {
  try {
    await room.createRoom(req.body.room);
    res.status(201).json({message: 'Room created successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await room.updateRoom(req.params.id, req.body);
    res.json({message: 'Room updated successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await room.deleteRoom(req.params.id);
    res.json({message: 'Room deleted successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/available', async (req, res) => {
  try {
    const {start_date, end_date} = req.query;
    const availableRooms = await room.showAvailableRooms(start_date, end_date);
    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

export default router;
