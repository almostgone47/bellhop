import 'dotenv/config';
import db from '../db.mjs';

const createRoom = async (room) => {
  await db.query(
    `INSERT INTO rooms (room_type_id, room_number) VALUES (?, ?)`,
    [room.roomTypeId, room.roomNumber],
  );
};

const getAllRooms = async () => {
  const [rows] = await db.query(
    `SELECT rooms.*, room_types.name as type_name, room_types.price
     FROM rooms
     JOIN room_types ON rooms.room_type_id = room_types.room_type_id`,
  );
  return rows;
};

const getRoomById = async (roomId) => {
  const [rows] = await db.query(
    `SELECT rooms.*, room_types.name as type_name, room_types.price
     FROM rooms
     JOIN room_types ON rooms.room_type_id = room_types.room_type_id
     WHERE rooms.room_id = ?`,
    [roomId],
  );
  return rows[0];
};

const updateRoom = async (roomId, room) => {
  await db.query(
    `UPDATE rooms SET room_type_id = ?, room_number = ? 
	 WHERE room_id = ?`,
    [room.roomTypeId, room.roomNumber, roomId],
  );
};

const deleteRoom = async (roomId) => {
  await db.query(
    `
  	DELETE FROM rooms 
	WHERE room_id = ?`,
    [roomId],
  );
};

const showAvailableRooms = async (startDate, endDate) => {
  const [rows] = await db.query(
    `SELECT rooms.*, room_types.name as type_name, room_types.price
     FROM rooms
     JOIN room_types ON rooms.room_type_id = room_types.room_type_id
     WHERE rooms.room_id NOT IN (
       SELECT room_bookings.room_id
       FROM room_bookings
       WHERE room_bookings.start_date <= ? AND room_bookings.end_date >= ?
       AND room_bookings.room_id IS NOT NULL
     )`,
    [endDate, startDate],
  );
  return rows;
};

export {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  showAvailableRooms,
};
