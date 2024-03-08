import 'dotenv/config';
import db from '../db.mjs';

const getAllRoomTypes = async () => {
  const [rows] = await db.query(
    `
    SELECT * FROM room_types;
    `,
  );
  return rows;
};

const getRoomTypeById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT * FROM room_types 
    WHERE room_type_id = ?;
   `,
    [id],
  );
  return rows.length ? rows[0] : null;
};

const getRoomTypePrice = async (id) => {
  const [[row]] = await db.query(
    `
    SELECT price FROM room_types 
    WHERE room_type_id = ?;
   `,
    [id],
  );
  return row.price;
};

const createRoomType = async (roomType) => {
  const {name, price, description} = roomType;
  const [rows] = await db.query(
    `
    INSERT INTO room_types (name, price, description) 
	  VALUES (?, ?, ?);
    `,
    [name, price, description],
  );
  return rows;
};

const updateRoomType = async (id, roomType) => {
  const {name, price} = roomType;
  const [rows] = await db.query(
    `
    UPDATE room_types SET name = ?, price = ? 
	  WHERE room_type_id = ?;
    `,
    [name, price, id],
  );
  return rows[0];
};

const deleteRoomTypeById = async (id) => {
  const [result] = await db.query(
    `
    DELETE FROM room_types
	  WHERE room_type_id = ?;
    `,
    [id],
  );
  return result.affectedRows;
};

export {
  createRoomType,
  getAllRoomTypes,
  getRoomTypeById,
  getRoomTypePrice,
  updateRoomType,
  deleteRoomTypeById,
};
