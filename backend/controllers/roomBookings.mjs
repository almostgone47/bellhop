import express from 'express';
import * as roomBooking from '../models/roomBooking.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const roomBookings = await roomBooking.getRoomBookings();
    res.json(roomBookings);
  } catch (error) {
    console.error('Error fetching room bookings:', error);
    res.status(500).json({error: 'Failed to retrieve room bookings.'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await roomBooking.getRoomBookingsByBookingId(req.params.id);
    console.log('res data: ', data);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Room booking not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve room booking.'});
  }
});

router.post('/', async (req, res) => {
  try {
    await roomBooking.createRoomBooking(req.body);
    res.status(201).json({message: 'Room booking created'});
  } catch (error) {
    console.error('Error creating room booking:', error);
    res.status(400).json({
      error: 'Could not create room booking.',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const roomBookingData = {...req.body, id: req.params.id};
    await roomBooking.updateRoomBooking(roomBookingData);
    res.json({message: 'Room booking updated.'});
  } catch (error) {
    console.log('Error updating room booking:', error);
    res.status(400).json({
      error: 'Could not update room booking.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await roomBooking.deleteRoomBookingById(req.params.id);
    if (deletedCount === 1) {
      res.status(200).send({
        Success: 'Room booking deleted',
      });
    } else {
      res.status(404).json({
        Error: 'Room booking not found',
      });
    }
  } catch (error) {
    console.log('Error deleting room booking:', error);
    res.status(500).send({
      error: 'Could not delete room booking',
    });
  }
});

export default router;
