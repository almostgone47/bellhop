import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditCustomerPage = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (!state?.customer) {
      toast.error('Customer data not found.');
      navigate('/customers');
    } else {
      setCustomer({
        first_name: state.customer.first_name,
        last_name: state.customer.last_name,
        email: state.customer.email,
        address: state.customer.address,
      });
    }
  }, [state, navigate]);

  const changeHandler = (e) => {
    const {name, value} = e.target;
    setCustomer({...customer, [name]: value});
  };

  const editCustomer = async () => {
    try {
      await axios.put(`/customers/${state.customer.customer_id}`, {
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        address: customer.address,
      });
      toast.success('Customer updated successfully!');
      navigate('/customers');
    } catch (error) {
      toast.error(`Failed to update customer: ${error.message || error}`);
    }
  };

  return (
    <section className="content-area">
      <h2>Edit Customer</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={customer.first_name}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={customer.last_name}
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
        <button onClick={editCustomer}>Submit Changes</button>
      </div>
    </section>
  );
};

export default EditCustomerPage;
