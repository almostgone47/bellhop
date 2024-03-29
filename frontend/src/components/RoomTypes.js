import React from 'react';

import RoomType from './RoomType';

function RoomTypes({roomTypes, onDelete, onEdit}) {
  return (
    <table id="roomTypes">
      <caption>Add and Edit Room Types</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
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
