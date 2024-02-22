import 'dotenv/config';
import db from '../db.mjs';

const createCustomer = async (customer) => {
  await db.query(
    `INSERT INTO customers (first_name, last_name, email, address) 
	 VALUES (?, ?, ?, ?)`,
    [customer.firstName, customer.lastName, customer.email, customer.address],
  );
};

const getAllCustomers = async () => {
  const [rows] = await db.query(`
  	SELECT * FROM customers`);
  return rows;
};

const getCustomerById = async (customerId) => {
  const [rows] = await db.query(
    `SELECT * FROM customers 
	 WHERE customer_id = ?`,
    [customerId],
  );
  return rows[0];
};

const updateCustomer = async (customerId, customer) => {
  await db.query(
    `UPDATE customers 
	 SET first_name = ?, last_name = ?, email = ?, address = ? 
	 WHERE customer_id = ?`,
    [
      customer.firstName,
      customer.lastName,
      customer.email,
      customer.address,
      customerId,
    ],
  );
};

const deleteCustomer = async (customerId) => {
  await db.query(
    `DELETE FROM customers 
  	 WHERE customer_id = ?`,
    [customerId],
  );
};

export {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
