import 'dotenv/config';
import db from '../db.mjs';

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

  return rows[0];
};

const createBooking = async (booking) => {
  const [rows] = await db.query(
    `
    INSERT INTO bookings (customer_id) 
    VALUES (?)
    `,
    [booking.customer_id],
  );

  return rows;
};

const updateBooking = async (booking) => {
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
  getBookingByEmail,
  deleteBookingById,
};
