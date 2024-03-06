import 'dotenv/config';
import db from '../db.mjs';

import {findOrCreateCustomer, updateCustomer} from './customer.mjs';
import {
  getRoomBookingByBookingId,
  updateOrInsertRoomBookings,
} from './roomBooking.mjs';

const getBookings = async () => {
  const [rows] = await db.query(
    `
    SELECT
      bookings.booking_id, 
      bookings.total_paid, 
      bookings.status, 
      CONCAT(customers.first_name, ' ', customers.last_name) AS guest_name,
      GROUP_CONCAT(rooms.room_number) AS room_numbers,
      MIN(room_bookings.start_date) AS arrival_date
    FROM bookings
    JOIN customers ON bookings.customer_id = customers.customer_id
    LEFT JOIN room_bookings ON bookings.booking_id = room_bookings.booking_id
    LEFT JOIN rooms ON room_bookings.room_id = rooms.room_id
    GROUP BY bookings.booking_id
    ORDER BY bookings.booking_id DESC;
     `,
  );
  return rows;
};

const getBookingById = async (id) => {
  console.log('Bookings Model1: ', id);
  const [rows] = await db.query(
    `
    SELECT
      bookings.booking_id, 
      bookings.total_paid,
      bookings.status,
      bookings.date_created AS booking_date,
      CONCAT(customers.first_name, ' ', customers.last_name) AS guest_name,
      customers.email,
      customers.address
    FROM bookings
    JOIN customers ON bookings.customer_id = customers.customer_id
    LEFT JOIN room_bookings ON bookings.booking_id = room_bookings.booking_id
    LEFT JOIN rooms ON room_bookings.room_id = rooms.room_id
    LEFT JOIN room_types ON room_bookings.room_type_id = room_types.room_type_id
    WHERE bookings.booking_id = ?
    GROUP BY bookings.booking_id;  
    `,
    [id],
  );

  const roomBookings = await getRoomBookingByBookingId(id);

  return {
    ...rows[0],
    room_bookings: roomBookings,
  };
};

async function editBooking(booking) {
  const [first_name, last_name] = booking.guest_name.split(' ');
  const lastName = last_name ? last_name : 'None Given';
  const customer = await findOrCreateCustomer(
    first_name,
    lastName,
    booking.email,
    booking.address,
  );

  await updateCustomer(customer.customer_id, {
    first_name: first_name,
    last_name: last_name,
    email: booking.email,
    address: booking.address,
  });

  const updatedBooking = await updateBooking({
    ...booking,
    ...customer,
  });

  for (const room_booking of booking.room_bookings) {
    const bookingId =
      booking.booking_id && booking.booking_id != 'undefined'
        ? booking.booking_id
        : '';

    const roomBooking = {
      ...updatedBooking,
      ...room_booking,
      ...customer,
    };

    await updateOrInsertRoomBookings(roomBooking);
  }
}

const createBooking = async (booking) => {
  const [first_name, last_name] = booking.guest_name.split(' ');
  const lastName = last_name ? last_name : 'None Given';
  const customer = await findOrCreateCustomer(
    first_name,
    lastName,
    booking.email,
    booking.address,
  );

  const [savedBooking] = await db.query(
    `
    INSERT INTO bookings (customer_id) 
    VALUES (?)
    `,
    [customer.insertId || customer.customer_id],
  );

  console.log('bookingId: ', savedBooking);
  const bookingId = savedBooking.insertId;

  for (const roomBooking of booking.room_bookings) {
    const [price] = await db.query(
      `
      SELECT price FROM room_types 
      WHERE room_type_id = ?
       `,
      [roomBooking.room_type_id],
    );
  }

  return {
    ...booking,
    booking_id: bookingId,
  };
};

const updateBooking = async (booking) => {
  if (booking.booking_id && booking.booking_id != 'undefined') {
    const existingBooking = await getBookingById(booking.booking_id);
    if (existingBooking) {
      const [rows] = await db.query(
        `
        UPDATE bookings 
        SET total_paid = ?, status = ?, date_created = ?
        WHERE booking_id = ?
        `,
        [
          booking.total_paid,
          booking.status,
          booking.booking_date,
          booking.booking_id,
        ],
      );
      return rows;
    }
  }
};

const getBookingByEmail = async (email) => {
  const [rows] = await db.query(
    `
    SELECT bookings.*, room_bookings.*
    FROM bookings
    JOIN customers ON bookings.customer_id = customers.customer_id
    LEFT JOIN room_bookings ON bookings.booking_id = room_bookings.booking_id
    WHERE customers.email = ?
     `,
    [email],
  );
  return rows[0];
};

const deleteBookingById = async (id) => {
  const [result] = await db.query(
    `
    DELETE FROM bookings 
    WHERE booking_id = ?
    `,
    [id],
  );
  return result.affectedRows;
};

export {
  getBookings,
  getBookingById,
  updateBooking,
  createBooking,
  editBooking,
  getBookingByEmail,
  deleteBookingById,
};
