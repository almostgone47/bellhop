import 'dotenv/config';
import db from '../db.mjs';

const createBooking = async (booking) => {
  await db.query(
    `INSERT INTO bookings (customer_id, date_created) 
     VALUES (?, ?)`,
    [booking.customer.id, booking.dateCreated],
  );

  const [bookingResult] = await db.query(
    `SELECT LAST_INSERT_ID() as bookingId`,
  );
  const bookingId = bookingResult[0].bookingId;

  await db.query(
    `INSERT INTO room_bookings (room_type_id, booking_id, start_date, end_date, nights, booked_price) 
     VALUES (?, ?, ?, ?, DATEDIFF(?, ?), (SELECT price FROM room_types 
     WHERE room_type_id = ?))`,
    [
      booking.roomType.id,
      bookingId,
      booking.startDate,
      booking.endDate,
      booking.endDate,
      booking.startDate,
      booking.roomType.id,
    ],
  );
};

const getBookings = async () => {
  const [rows] = await db.query(
    `SELECT bookings.*, customers.*, room_bookings.*
     FROM bookings
     JOIN customers ON bookings.customer_id = customers.customer_id
     LEFT JOIN room_bookings ON bookings.booking_id = room_bookings.booking_id`,
  );
  return rows;
};

const updateBooking = async (booking) => {
  await db.query(
    `
    UPDATE bookings SET status = ? 
    WHERE booking_id = ?`,
    [booking.status, booking.id],
  );
};

const getBookingByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT bookings.*, room_bookings.*
     FROM bookings
     JOIN customers ON bookings.customer_id = customers.customer_id
     LEFT JOIN room_bookings ON bookings.booking_id = room_bookings.booking_id
     WHERE customers.email = ?`,
    [email],
  );
  return rows[0];
};

const deleteBookingById = async (id) => {
  const [result] = await db.query(
    `
    DELETE FROM bookings 
    WHERE booking_id = ?`,
    [id],
  );
  return result.affectedRows;
};

export {
  createBooking,
  getBookings,
  updateBooking,
  getBookingByEmail,
  deleteBookingById,
};
