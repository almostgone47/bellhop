import 'dotenv/config';
import db from '../db.mjs';

const getRoomBookingsByBookingId = async (bookingId) => {
  const [rows] = await db.query(
    `SELECT room_type_id AS roomTypeId, start_date AS startDate, end_date AS endDate  
     FROM room_bookings 
	   WHERE booking_id = ?`,
    [bookingId],
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
  const {bookingId, roomTypeId, startDate, endDate, nights, bookedPrice} =
    roomBooking;
  await db.query(
    `INSERT INTO room_bookings (booking_id, room_type_id, start_date, end_date, DATEDIFF(end_date, start_date), booked_price) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [bookingId, roomTypeId, startDate, endDate, nights, bookedPrice],
  );
};

const updateRoomBooking = async (roomBookingId, updates) => {
  const {roomTypeId, startDate, endDate, nights, bookedPrice} = updates;
  await db.query(
    `UPDATE room_bookings 
     SET room_type_id = ?, start_date = ?, end_date = ?, nights = DATEDIFF(end_date, start_date), booked_price = ? 
     WHERE room_booking_id = ?`,
    [roomTypeId, startDate, endDate, nights, bookedPrice, roomBookingId],
  );
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
  getRoomBookingsByBookingId,
  getRoomBookingById,
  createRoomBooking,
  updateRoomBooking,
  deleteRoomBookingById,
};
