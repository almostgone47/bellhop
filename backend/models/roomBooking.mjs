import 'dotenv/config';
import db from '../db.mjs';

const getRoomBookingByBookingId = async (booking_id) => {
  const [rows] = await db.query(
    `SELECT * FROM room_bookings 
	   WHERE booking_id = ?`,
    [booking_id],
  );
  return rows;
};

const getRoomBookingById = async (roomBookingId) => {
  const [rows] = await db.query(
    `SELECT * FROM room_bookings 
	   WHERE room_booking_id = ?`,
    [roomBookingId],
  );
  return rows[0];
};

const createRoomBooking = async (roomBooking) => {
  const {booking_id, room_type_id, start_date, end_date} = roomBooking;
  const [rows] = await db.query(
    `INSERT INTO room_bookings (booking_id, room_type_id, start_date, end_date, nights) 
     VALUES (?, ?, ?, ?, DATEDIFF(?, ?))`,
    [booking_id, room_type_id, start_date, end_date, end_date, start_date],
  );
  return rows[0];
};

const updateRoomBooking = async (roomBookingId, updates) => {
  const {room_type_id, start_date, end_date, booked_price, room_id} = updates;
  const startDate = start_date.slice(0, 10);
  const endDate = end_date.slice(0, 10);
  const [rows] = await db.query(
    `UPDATE room_bookings 
    SET room_type_id = ?, start_date = ?, end_date = ?, nights = DATEDIFF(?, ?), booked_price = ?, room_id = ?
    WHERE room_booking_id = ?`,
    [
      room_type_id,
      startDate,
      endDate,
      endDate,
      startDate,
      booked_price,
      room_id,
      roomBookingId,
    ],
  );
  return rows;
};

const deleteRoomBookingById = async (roomBookingId) => {
  const [result] = await db.query(
    `DELETE FROM room_bookings 
     WHERE room_booking_id = ?`,
    [roomBookingId],
  );
  return result.affectedRows;
};

export {
  getRoomBookingByBookingId,
  getRoomBookingById,
  createRoomBooking,
  updateRoomBooking,
  deleteRoomBookingById,
};
