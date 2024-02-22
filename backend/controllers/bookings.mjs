import express from 'express';
import * as booking from '../models/booking.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('GET BOOKINGS');
    const bookings = await booking.getBookings();
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({error: 'Failed to retrieve bookings.'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await customer.getBookingById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Customer not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve booking.'});
  }
});

router.post('/', async (req, res) => {
  console.log('POST BOOKING');
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
    const bookingData = {...req.body, id: req.params.id};
    await booking.updateBooking(bookingData);
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
