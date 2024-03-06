import 'dotenv/config';
import db from '../db.mjs';

const getBookings = async () => {
  const [rows] = await db.query(
    `
    SELECT 
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
  console.log('rows: ', rows);
  return rows;
};

const getBookingById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT bookings.*, room_bookings.*
    FROM bookings
    JOIN customers ON bookings.customer_id = customers.customer_id
    LEFT JOIN room_bookings ON bookings.booking_id = room_bookings.booking_id
    WHERE bookings.booking_id = ?
     `,
    [id],
  );
  return rows[0];
};

const createBooking = async ({booking}) => {
  const [savedBooking] = await db.query(
    `
    INSERT INTO bookings (customer_id) 
    VALUES (?)
    `,
    [booking.customerId],
  );

  console.log('bookingId: ', savedBooking);
  const bookingId = savedBooking.insertId;

  for (const roomBooking of booking.roomBookings) {
    const [[{price}]] = await db.query(
      `
      SELECT price FROM room_types 
      WHERE room_type_id = ?
       `,
      [roomBooking.roomTypeId],
    );

    await db.query(
      `
      INSERT INTO room_bookings (booking_id, room_type_id, start_date, end_date, nights, booked_price) 
      VALUES (?, ?, ?, ?, DATEDIFF(end_date, start_date), ?)
       `,
      [
        bookingId.toString(),
        roomBooking.roomTypeId,
        roomBooking.startDate,
        roomBooking.endDate,
        price.toLocaleString(undefined, {minimumFractionDigits: 2}),
      ],
    );
  }
};

const updateBooking = async (booking) => {
  await db.query(
    `
    UPDATE bookings SET status = ? 
    WHERE booking_id = ?
    `,
    [booking.status, booking.id],
  );
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
  console.log('deleted: ', result);
  return result.affectedRows;
};

export {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  getBookingByEmail,
  deleteBookingById,
};
