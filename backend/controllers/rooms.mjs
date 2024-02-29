//Controllers for Rooms Entity

//Import dependencies
import express from 'express';
import * as customer from '../models/room.mjs';

const router = express.Router();

//Retreive All Rooms
router.get('/rooms', async (req, res) => {
  try {
    console.log('GET ROOMS');
    const rooms = await customer.getRooms();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({error: 'Failed to retrieve rooms.'});
  }
});

//Retreive Room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    const data = await customer.getRoomById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Room not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve Room.'});
  }
});

//Retreive Available Rooms
router.get('/rooms', async (req, res) => {
  try {
    const data = await room.getAvailableRooms();
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Available rooms not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve available rooms.'});
  }
});

//Create Room
router.post('/rooms', async (req, res) => {
  console.log('POST ROOM');
  try {
    await room.createRoom(req.body.room_type_id, req.body.room_number);
    res.json({message: 'Room created'});
  } catch (error) {
    console.error('Error creating Room:', error);
    res.status(400).json({
      error: 'Could not create Room.',
    });
  }
});

//Delete Room by ID
router.delete('/rooms:id', async (req, res) => {
  try {
    const deletedCount = await customer.deleteRoomById(req.params.id);
    if (deletedCount === 1) {
      res.status(200).send({
        Success: 'Room deleted',
      });
    } else {
      res.status(404).json({
        Error: 'No Room found with the given ID',
      });
    }
  } catch (error) {
    console.log('Error deleting Room:', error);
    res.status(500).send({
      error: 'Could not delete Room',
    });
  }
});

export default router;
