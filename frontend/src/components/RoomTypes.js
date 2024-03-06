import React from 'react';

import RoomType from './RoomType';

function RoomTypes({roomTypes, onDelete, onEdit}) {
  return (
    <table id="roomTypes">
      <caption>Room Types Overview</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Room Type</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roomTypes.map((roomType) => (
          <RoomType
            key={roomType.room_type_id}
            roomType={roomType}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default RoomTypes;
