import React from 'react';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Room({room, onEdit, onDelete}) {
  const navigate = useNavigate();

  const gotToEditPage = (room) => {
    navigate('/settings/updateRoom', {state: {room}});
  };

  return (
    <tr>
      <td>{room.room_id}</td>
      <td>{room.room_number}</td>
      <td>
        <FaEdit
          onClick={() => gotToEditPage(room)}
          style={{cursor: 'pointer'}}
        />
        <FaRegTrashAlt
          onClick={() => onDelete(room.room_id)}
          style={{cursor: 'pointer', marginLeft: '10px'}}
        />
      </td>
    </tr>
  );
}

export default Room;
