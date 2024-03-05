import React from 'react';
import Room from '../components/Room';

function Rooms({rooms, onDelete, onEdit}) {
  return (
    <table id="rooms">
      <caption>Add and Edit Rooms</caption>
      <thead>
        <tr>
          <th>Room ID</th>
          <th>Room Type ID</th>
          <th>Room Number</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, i) => (
          <Room room={room} key={i} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </tbody>
    </table>
  );
}

export default Rooms;
