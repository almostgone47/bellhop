import React from 'react';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';

function Room({room, onEdit, onDelete}) {
  return (
    <tr>
      <td>{room.room_id}</td>
      <td>{room.room_type_id}</td>
      <td>{room.room_number}</td>
      <td>
        <FaEdit onClick={() => onEdit(room)} style={{cursor: 'pointer'}} />
        <FaRegTrashAlt
          onClick={() => onDelete(room.room_id)}
          style={{cursor: 'pointer', marginLeft: '10px'}}
        />
      </td>
    </tr>
  );
}

export default Room;
