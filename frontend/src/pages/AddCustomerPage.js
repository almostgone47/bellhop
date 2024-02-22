import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCustomerPage = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setCustomer({...customer, [name]: value});
  };

  const addCustomer = async () => {
    try {
      await axios.post('/customers', {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        address: customer.address,
      });
      toast.success('Customer successfully added!');
      navigate('/customers');
    } catch (error) {
      toast.error('Failed to add customer.');
    }
  };

  return (
    <section className="content-area">
      <h2>Add a Customer</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={customer.firstName}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={customer.lastName}
          onChange={changeHandler}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={customer.email}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Address"
          name="address"
          value={customer.address}
          onChange={changeHandler}
        />
        <button onClick={addCustomer}>Submit Customer</button>
      </div>
    </section>
  );
};

export default AddCustomerPage;
