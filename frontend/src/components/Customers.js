import React from 'react';
import Customer from '../components/Customer';

function Customers({customers, onDelete, onEdit}) {
  return (
    <table id="customers">
      <caption>Add and Edit Rooms</caption>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, i) => (
          <Customer
            customer={customer}
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
