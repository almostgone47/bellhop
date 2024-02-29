import React from 'react';

// Import icons
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
        <FaEdit onClick={() => onEdit(customer)} />
      </td>
      <td>
        <FaRegTrashAlt onClick={() => onDelete(customer.customer_id)} />
      </td>
    </tr>
  );
}

export default Customer;