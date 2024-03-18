import express from 'express';
import moment from 'moment-timezone';

import {
  getBookingById,
  getBookings,
  createBooking,
  getBookingByEmail,
  updateBooking,
  deleteBookingById,
} from '../models/booking.mjs';
import {
  getRoomBookingById,
  getRoomBookingByBookingId,
  createRoomBooking,
  updateRoomBooking,
} from '../models/roomBooking.mjs';
import {getRoomTypePrice, getRoomTypeById} from '../models/roomType.mjs';
import {
  getCustomerByEmail,
  createCustomer,
  updateCustomer,
} from '../models/customer.mjs';

const router = express.Router();

const formatDate = (date) => {
  return moment(date).tz('UTC').format('YYYY-MM-DD');
};

const findOrCreateCustomer = async (bookingData) => {
  let [first_name, last_name] = bookingData.guest_name.split(' ');
  last_name = last_name ? last_name : 'None Given';

  const existingCustomer = await getCustomerByEmail(bookingData.email);

  if (existingCustomer) {
    return existingCustomer;
  } else {
    const newCustomer = await createCustomer({
      first_name,
      last_name,
      email: bookingData.email,
      address: bookingData.address,
    });

    return newCustomer;
  }
};

const updateOrInsertRoomBookings = async (roomBooking) => {
  if (roomBooking.room_booking_id) {
    const existingBooking = await getRoomBookingById(
      roomBooking.room_booking_id,
    );
    if (existingBooking) {
      const updatedBooking = await updateRoomBooking(
        roomBooking.room_booking_id,
        {
          room_type_id: roomBooking.room_type_id,
          start_date: roomBooking.start_date,
          end_date: roomBooking.end_date,
          booked_price: roomBooking.booked_price,
          room_id: roomBooking.room_id,
        },
      );

      return updatedBooking;
    }
  } else {
    await createRoomBooking(roomBooking);
  }
};

router.get('/:id', async (req, res) => {
  try {
    const isBooking = await getBookingById(req.params.id);

    if (isBooking) {
      const roomBookings = await getRoomBookingByBookingId(req.params.id);

      const bookingById = {
        ...isBooking,
        room_bookings: roomBookings,
      };

      res.json(bookingById);
    } else {
      res.status(404).send({message: 'Booking not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve booking.'});
  }
});

router.get('/', async (req, res) => {
  try {
    let bookings = await getBookings();

    bookings = await Promise.all(
      bookings.map(async (booking) => {
        const roomBookings = await getRoomBookingByBookingId(
          booking.booking_id,
        );

        const formattedRoomBookings = await Promise.all(
          roomBookings.map(async (rb) => {
            const roomType = await getRoomTypeById(rb.room_type_id);
            return {
              ...rb,
              room_type: roomType,
              start_date: formatDate(new Date(rb.start_date)),
              end_date: formatDate(new Date(rb.end_date)),
            };
          }),
        );

        return {...booking, room_bookings: formattedRoomBookings};
      }),
    );

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({error: 'Failed to retrieve bookings.'});
  }
});

router.post('/', async (req, res) => {
  try {
    const customer = await findOrCreateCustomer(req.body);

    const newBookingData = {
      ...req.body,
      customer_id: customer.insertId || customer.customer_id,
    };

    const savedBooking = await createBooking(newBookingData);

    for (const room_booking of newBookingData.room_bookings) {
      const roomPrice = await getRoomTypePrice(room_booking.room_type_id);

      const roomBooking = {
        ...newBookingData,
        ...room_booking,
        ...customer,
        booked_price: roomPrice,
        booking_id: savedBooking.insertId,
      };
      await createRoomBooking(roomBooking);
    }

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
    const booking = await getBookingByEmail(req.params.email);
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

    const customer = await getCustomerByEmail(bookingData.email);
    const [first_name, last_name] = bookingData.guest_name.split(' ');

    await updateCustomer(customer.customer_id, {
      first_name: first_name,
      last_name: last_name,
      email: bookingData.email,
      address: bookingData.address,
    });

    await updateBooking(bookingData);

    for (const room_booking of bookingData.room_bookings) {
      const roomPrice = await getRoomTypePrice(room_booking.room_type_id);

      room_booking.room_id = room_booking.room_numbers;
      const roomBooking = {
        ...bookingData,
        ...room_booking,
        ...customer,
        booked_price: roomPrice,
      };

      await updateOrInsertRoomBookings(roomBooking);
    }

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
    const deletedCount = await deleteBookingById(req.params.id);
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
