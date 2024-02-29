//Controllers for Customers Entity

//Import dependencies
import express from 'express';
import * as customer from '../models/customer.mjs';

const router = express.Router();

//Retreive All Customers
router.get('/customers', async (req, res) => {
  try {
    console.log('GET CUSTOMERS');
    const customers = await customer.getCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({error: 'Failed to retrieve customers.'});
  }
});

//Retreive Customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const data = await customer.getCustomerById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Customer not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve Customer.'});
  }
});

//Retreive Customer by Email
router.get('/customers/:email', async (req, res) => {
  try {
    const data = await customer.getCustomerByEmail(req.params.email);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Customer not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve Customer.'});
  }
});

//Create Customer
router.post('/customers', async (req, res) => {
  console.log('POST CUSTOMER');
  try {
    await customer.createCustomer(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.address,
    );
    res.json({message: 'Customer created'});
  } catch (error) {
    console.error('Error creating Customer:', error);
    res.status(400).json({
      error: 'Could not create Customer.',
    });
  }
});

//Update Customer by ID
router.put('/:id', async (req, res) => {
  try {
    const customerData = [
      req.params.id,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.address,
    ];
    await customer.updateCustomer(customerData);
    res.json({message: 'Customer updated.'});
  } catch (error) {
    console.log('Error updating customer:', error);
    res.status(400).json({
      error: 'Could not update customer.',
    });
  }
});

//Delete Customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await customer.deleteCustomerById(req.params.id);
    if (deletedCount === 1) {
      res.status(200).send({
        Success: 'Customer deleted',
      });
    } else {
      res.status(404).json({
        Error: 'No customer found with the given ID',
      });
    }
  } catch (error) {
    console.log('Error deleting Customer:', error);
    res.status(500).send({
      error: 'Could not delete Customer',
    });
  }
});

export default router;
