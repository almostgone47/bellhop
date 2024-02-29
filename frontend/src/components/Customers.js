import React from 'react';
import Customer from './Customer';

function Customers({customers, onEdit, onDelete}) {
  return (
    <table id="customers">
      <caption>
        <strong>Customers</strong>{' '}
      </caption>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, i) => (
          <Customer
            customer={customer.customer_id}
            key={i}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Customers;
