import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {FaPlusCircle} from 'react-icons/fa';
import Customers from '../components/Customers';

function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await fetch('/customers');
      if (!response.ok) throw new Error('Failed to fetch customer types');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to load customer types:', error);
    }
  };

  const onEditCustomer = (customer) => {
    navigate('/updateCustomer', {state: {customer}});
  };

  const onDeleteCustomer = async (id) => {
    try {
      const response = await fetch(`/customers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomers(
          customers.filter((customer) => customer.customer_id !== id),
        );
      } else {
        throw new Error(`Failed to delete customer type with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting customer type:', error);
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
