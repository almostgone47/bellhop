import express from 'express';

import * as booking from '../models/booking.mjs';
import {getRoomBookingByBookingId} from '../models/roomBooking.mjs';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const isBooking = await booking.getBookingById(req.params.id);
    if (isBooking) {
      res.json(isBooking);
    } else {
      res.status(404).send({message: 'Booking not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve booking.'});
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await booking.getBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({error: 'Failed to retrieve bookings.'});
  }
});

router.post('/', async (req, res) => {
  try {
    await booking.createBooking(req.body);
    res.json({message: 'Booking created'});
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({
      error: 'Could not create booking.',
    });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const booking = await booking.getBookingByEmail(req.params.email);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({error: 'Booking not found.'});
    }
  } catch (error) {
    console.log('Error retrieving booking:', error);
    res.status(400).json({error: 'Error retrieving booking.'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      booking_date: req.body.booking_date.slice(0, 10),
      booking_id: req.params.id,
    };

    await booking.editBooking(bookingData);

    res.json({message: 'Booking updated.'});
  } catch (error) {
    console.log('Error updating booking:', error);

    res.status(400).json({
      error: 'Could not update booking.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await booking.deleteBookingById(req.params.id);
    if (deletedCount === 1) {
      res.status(200).send({
        Success: 'Booking deleted',
      });
    } else {
      res.status(404).json({
        Error: 'No booking found with the given ID',
      });
    }
  } catch (error) {
    console.log('Error deleting booking:', error);
    res.status(500).send({
      error: 'Could not delete booking',
    });
  }
});

export default router;
