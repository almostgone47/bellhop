import express from 'express';
import * as customer from '../models/customer.mjs';

const router = express.Router();

router.get('/search', async (req, res) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.status(400).send({error: 'No search query entered.'});
  }

  try {
    const results = await customer.searchCustomerBookings(searchQuery);
    console.log('searh results: ', results);
    res.json(results);
  } catch (error) {
    console.error('Database search error:', error);
    res.status(500).send({error: 'Error'});
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await customer.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve customers.'});
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
    res.status(200).send({message: 'Customer deleted successfully'});
  } catch (error) {
    res
      .status(500)
      .send({message: 'Error deleting customer', error: error.message});
  }
});

export default router;
