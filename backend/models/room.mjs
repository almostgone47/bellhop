// CRUD Operations for Customers entity: 
//      Create new customer
//      View all customers
//      Search for customer by email
//      Delete customer
//      Update customer

//Import dependencies
import 'dotenv/config';
import db from '../db.mjs';

// DISPLAY all current customers
const getCustomers = async () => {
  const [rows] = await db.query(
    `SELECT * FROM customers`,
  );
  return rows;
};

// SEARCH for customer by ID
const getCustomerByID = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM customers
     WHERE customers.customer_id = ?`,
    [id],
  );
  return rows[0];
};

//SEARCH for customer by email
const getCustomerByEmail = async (email) => {
  const [rows] = await db.query(
    `SELECT *
     FROM customers
     WHERE customers.email = ?`,
    [email],
  );
  return rows[0];
};

// CREATE NEW customer
const createCustomer = async ({first_name, last_name, email, address}) => {
  await db.query(
    `INSERT INTO customers (first_name, last_name, email, address) 
    VALUES (?, ? , ? , ?)`,
    [customer.first_name, customer.last_name, customer.email, customer.address]
  );
  }

//UPDATE existing customer
const updateCustomer = async ({first_name, last_name, email, address}) => {
   await db.query (
    `UPDATE customers SET first_name = customer.first_name,
     last_name = customer.last_name, email = customer.email, address = customer.address
     WHERE customer_id = ?`,
     [customer.first_name, customer.last_name, customer.email, customer.address]
  )
}

//DELETE customer
const deleteCustomergById = async (id) => {
  const [result] = await db.query(
    `
    DELETE FROM customers 
    WHERE customer_id = ?`,
    [id],
  );
  return result.deletedCount;
};

//EXPORT the variables for use in the controller file
export {
  getCustomers,
  getCustomerByID,
  getCustomerByEmail,
  createCustomer,
  updateCustomer,
  deleteCustomergById,
};