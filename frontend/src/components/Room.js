import React from 'react';

// Import icons
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';

function Room({room, onEdit, onDelete}) {
  return (
    <tr>
      <td>{room.room_id}</td>
      <td>{room.room_type_id}</td>
      <td>{room.room_number}</td>
      <td>
        <FaEdit onClick={() => onEdit(customer)} />
      </td>
      <td>
        <FaRegTrashAlt onClick={() => onDelete(customer.customer_id)} />
      </td>
    </tr>
  );
}

export default Room;