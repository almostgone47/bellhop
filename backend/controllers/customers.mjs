import express from 'express';
import * as customer from '../models/customer.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await customer.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve customers.'});
  }
});

router.post('/', async (req, res) => {
  try {
    await customer.createCustomer(req.body);
    res.status(201).send({message: 'Customer created successfully'});
  } catch (error) {
    res.status(400).json({
      error: 'Could not create customer.',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await customer.getCustomerById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({message: 'Customer not found'});
    }
  } catch (error) {
    res
      .status(500)
      .send({message: 'Error retrieving customer', error: error.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await customer.updateCustomer(req.params.id, req.body);
    res.send({message: 'Customer updated successfully'});
  } catch (error) {
    res
      .status(500)
      .send({message: 'Error updating customer', error: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await customer.deleteCustomer(req.params.id);
    if (result.affectedRows > 0) {
      res.send({message: 'Customer deleted successfully'});
    } else {
      res.status(404).send({message: 'Customer not found'});
    }
  } catch (error) {
    res
      .status(500)
      .send({message: 'Error deleting customer', error: error.message});
  }
});

export default router;
