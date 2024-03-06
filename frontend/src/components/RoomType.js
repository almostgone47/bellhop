import React from 'react';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function RoomType({roomType, onEdit, onDelete}) {
  const navigate = useNavigate();

  const onEditRoomType = (roomType) => {
    navigate('/settings/updateRoomType', {state: {roomType}});
  };

  return (
    <tr>
      <td>{roomType.room_type_id}</td>
      <td>{roomType.name}</td>
      <td>{roomType.description}</td>
      <td>{roomType.price}</td>
      <td>
        <FaEdit
          onClick={() => onEditRoomType(roomType)}
          style={{cursor: 'pointer'}}
        />
        <FaRegTrashAlt
          onClick={() => onDelete(roomType.room_type_id)}
          style={{cursor: 'pointer', marginLeft: '10px'}}
        />
      </td>
    </tr>
  );
}

export default RoomType;
