import 'dotenv/config';
import db from '../db.mjs';

const getCustomerById = async (customerId) => {
  const [rows] = await db.query(
    `
    SELECT * FROM customers 
    WHERE customer_id = ?
    `,
    [customerId],
  );
  return rows[0];
};

const getCustomerByEmail = async (email) => {
  const [rows] = await db.query(
    `
    SELECT * FROM customers 
    WHERE email = ?
    `,
    [email],
  );
  return rows[0];
};

const getAllCustomers = async () => {
  const [rows] = await db.query(
    `
    SELECT * FROM customers
    `,
  );
  return rows;
};

const createCustomer = async (customer) => {
  const [rows] = await db.query(
    `
    INSERT INTO customers (first_name, last_name, email, address) 
	  VALUES (?, ?, ?, ?)
    `,
    [customer.first_name, customer.last_name, customer.email, customer.address],
  );
  return rows;
};

const updateCustomer = async (customerId, customer) => {
  const [rows] = await db.query(
    `
    UPDATE customers 
    SET first_name = ?, last_name = ?, email = ?, address = ? 
    WHERE customer_id = ?
    `,
    [
      customer.first_name,
      customer.last_name,
      customer.email,
      customer.address,
      customerId,
    ],
  );
  return rows[0];
};

const deleteCustomer = async (customerId) => {
  const [result] = await db.query(
    `
    DELETE FROM customers 
  	WHERE customer_id = ?
    `,
    [customerId],
  );
  return result.affectedRows;
};

const searchCustomerBookings = async (query) => {
  const [rows, fields] = await db.query(
    `
    SELECT 
      c.customer_id, 
      c.first_name, 
      c.last_name, 
      c.email, 
      b.booking_id, 
      b.status, 
      MIN(rb.start_date) AS start_date
    FROM customers c
    LEFT JOIN bookings b ON c.customer_id = b.customer_id
    LEFT JOIN room_bookings rb ON b.booking_id = rb.booking_id
    WHERE LOWER(c.first_name) LIKE CONCAT(LOWER(?), '%') 
    OR LOWER(c.last_name) LIKE CONCAT(LOWER(?), '%')
    OR LOWER(c.email) LIKE CONCAT(LOWER(?), '%')
    GROUP BY c.customer_id, c.first_name, c.last_name, c.email, b.booking_id, b.status
    ORDER BY c.first_name, c.last_name, c.email;  
    `,
    [query, query, query],
  );
  return rows;
};

export {
  getCustomerById,
  getCustomerByEmail,
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomerBookings,
};
