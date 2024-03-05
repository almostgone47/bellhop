import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

import Customers from '../components/Customers';

function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await axios.get('/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error('Failed to load customer types:', error);
      toast.error('Failed to load customer types');
    }
  };

  const onEditCustomer = (customer) => {
    navigate('/updateCustomer', {state: {customer}});
  };

  const onDeleteCustomer = async (id) => {
    try {
      const res = await axios.delete(`/customers/${id}`);
      if (res.status === 200) {
        setCustomers(
          customers.filter((customer) => customer.customer_id !== id),
        );
        toast.success('Customer Deleted');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error('Error deleting customer');
    }
  };

  return (
    <section className="content-area">
      <h2>Customers</h2>
      <p id="addCustomerBtn">
        <Link to="/createCustomer">
          <FaPlusCircle /> Add Customer
        </Link>
      </p>
      {customers.length > 0 ? (
        <Customers
          customers={customers}
          onEdit={onEditCustomer}
          onDelete={onDeleteCustomer}
        />
      ) : (
        <p>No customers available.</p>
      )}
    </section>
  );
}

export default CustomersPage;
