import express from 'express';
import * as booking from '../models/booking.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('GET BOOKINGS');
    const bookings = await booking.getBookings();
    if (bookings !== null && bookings.length > 0) {
      res.json(bookings);
    } else {
      res.status(404).json({Error: 'No bookings found in the database.'});
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({Error: 'Failed to retrieve bookings.'});
  }
});

router.post('/', (req, res) => {
  booking
    .createBooking(req.body)
    .then(() => {
      res.status(201).json({message: 'Booking successfully created'});
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: 'Unable to create booking. Please check the provided data.',
      });
    });
});

router.get('/:email', (req, res) => {
  booking
    .getBookingByEmail(req.params.email)
    .then((booking) => {
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({Error: 'Booking not found.'});
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({Error: 'Error retrieving booking.'});
    });
});

router.put('/:id', (req, res) => {
  const booking = {...req.body, id: req.params.id};
  booking
    .updateBooking(booking)
    .then(() => {
      res.json({message: 'Booking updated successfully'});
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error: 'Unable to update booking. Please check the provided data.',
      });
    });
});

router.delete('/:id', (req, res) => {
  booking
    .deleteBookingById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send({
          Success: 'Delete was successful.',
        });
      } else {
        res.status(404).json({
          Error: 'No booking found with the given ID, nothing to delete.',
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({
        error: 'An error occurred while attempting to delete the booking.',
      });
    });
});

export default router;
