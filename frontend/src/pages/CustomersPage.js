import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Customers from '../components/Customers';
import {FaPlusCircle} from 'react-icons/fa';

function CustomerPage() {
  // Use the Navigate for redirection
  const redirect = useNavigate();

  // Use state to bring in the data
  const [customers, setCustomers] = useState([]);

  // RETRIEVE all customers
  const loadCustomers = async () => {
    const response = await fetch('/customers');
    const customers = await response.json();
    setCustomers(customers);
  };

  //UPDATE customer by id
  const onEditCustomer = async (customer) => {
    redirect('/updateCustomer', {state: {customer}});
  };

  //DELETE customer by id
  const onDeleteCustomer = async (_id) => {
    const response = await fetch(`/customers/${_id}`, {method: 'DELETE'});
    if (response.status === 200) {
      const getResponse = await fetch('/customers');
      const customers = await getResponse.json();
      setCustomers(customers);
    } else {
      console.error(
        `There was an error and the Customer could not be deleted from your database. = ${_id}, status code = ${response.status}`,
      );
    }
  };

  // LOAD all customers
  useEffect(() => {
    loadCustomers();
  }, []);

  // DISPLAY customers
  return (
    <section className="content-area">
      <h2>Customers</h2>
      <p id="addCustomerBtn">
        <Link to="/createCustomer">
          <FaPlusCircle />
          Add Customer
        </Link>
      </p>
      {customers.length > 0 ? (
        <Customers
          customers={customers}
          onEdit={onEditCustomer}
          onDelete={onDeleteCustomer}
        />
      ) : (
        <p>No customers found.</p>
      )}
    </section>
  );
}

export default CustomerPage;
