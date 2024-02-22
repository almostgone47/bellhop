import express from 'express';
import * as roomTypeModel from '../models/roomType.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const roomTypes = await roomTypeModel.getAllRoomTypes();
    res.json(roomTypes);
  } catch (error) {
    res.status(500).json({error: 'Error retrieving room types.'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const roomType = await roomTypeModel.getRoomTypeById(req.params.id);
    if (roomType) {
      res.json(roomType);
    } else {
      res.status(404).json({message: 'Room type not found.'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error retrieving room type.'});
  }
});

router.post('/', async (req, res) => {
  try {
    await roomTypeModel.createRoomType(req.body);
    res.status(201).json({message: 'Room type created successfully.'});
  } catch (error) {
    res.status(500).json({error: 'Error creating room type.'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await roomTypeModel.updateRoomType(req.params.id, req.body);
    res.status(200).json({message: 'Room type updated successfully.'});
  } catch (error) {
    res.status(500).json({error: 'Error updating room type.'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await roomTypeModel.deleteRoomTypeById(req.params.id);
    res.status(200).json({message: 'Room type deleted successfully.'});
  } catch (error) {
    res.status(500).json({error: 'Error deleting room type.'});
  }
});

export default router;
