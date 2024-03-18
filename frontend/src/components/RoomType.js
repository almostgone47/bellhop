import React from 'react';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';

function RoomType({roomType, onEdit, onDelete}) {
  return (
    <tr>
      <td>{roomType.room_type_id}</td>
      <td>{roomType.name}</td>
      <td>{roomType.description}</td>
      <td>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(roomType.price)}
      </td>
      <td>
        <FaEdit onClick={() => onEdit(roomType)} style={{cursor: 'pointer'}} />
        <FaRegTrashAlt
          onClick={() => onDelete(roomType.room_type_id)}
          style={{cursor: 'pointer', marginLeft: '10px'}}
        />
      </td>
    </tr>
  );
}

export default RoomType;
