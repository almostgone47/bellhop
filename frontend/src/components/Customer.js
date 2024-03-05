import React from 'react';

import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';

function Customer({customer, onEdit, onDelete}) {
  return (
    <tr>
      <td>{customer.customer_id}</td>
      <td>{customer.first_name}</td>
      <td>{customer.last_name}</td>
      <td>{customer.email}</td>
      <td>{customer.address}</td>
      <td>
        <FaEdit onClick={() => onEdit(customer)} style={{cursor: 'pointer'}} />
        <FaRegTrashAlt
          onClick={() => onDelete(customer.customer_id)}
          style={{cursor: 'pointer', marginLeft: '10px'}}
        />
      </td>
    </tr>
  );
}

export default Customer;
