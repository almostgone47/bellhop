import express from 'express';
import * as roomTypeModel from '../models/roomType.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await roomTypeModel.createRoomType(req.body);
    res.status(201).json({message: 'Room type created successfully.'});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error creating room type.', error: error.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const roomTypes = await roomTypeModel.getAllRoomTypes();
    res.json(roomTypes);
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error retrieving room types.', error: error.message});
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
    res
      .status(500)
      .json({message: 'Error retrieving room type.', error: error.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await roomTypeModel.updateRoomType(req.params.id, req.body);
    res.json({message: 'Room type updated successfully.'});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error updating room type.', error: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await roomTypeModel.deleteRoomTypeById(req.params.id);
    res.json({message: 'Room type deleted successfully.'});
  } catch (error) {
    res
      .status(500)
      .json({message: 'Error deleting room type.', error: error.message});
  }
});

export default router;
