import 'dotenv/config';
import db from '../db.mjs';

const createRoomType = async (roomType) => {
  const {name, price} = roomType;
  await db.query(
    `
  	INSERT INTO room_types (name, price) 
	VALUES (?, ?)`,
    [name, price],
  );
};

const getAllRoomTypes = async () => {
  const [rows] = await db.query(`
  	SELECT * FROM room_types`);
  return rows;
};

const getRoomTypeById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM room_types 
	 WHERE room_type_id = ?`,
    [id],
  );
  return rows.length ? rows[0] : null;
};

const updateRoomType = async (id, roomType) => {
  const {name, price} = roomType;
  await db.query(
    `UPDATE room_types SET name = ?, price = ? 
	 WHERE room_type_id = ?`,
    [name, price, id],
  );
};

const deleteRoomTypeById = async (id) => {
  await db.query(
    `DELETE FROM room_types
	 WHERE room_type_id = ?`,
    [id],
  );
};

export {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  updateRoomType,
  deleteRoomTypeById,
};
