import React from 'react';
import Room from '/Room'; 

function Rooms({rooms, onEdit, onDelete}) {
  return (
    <table id="rooms">
        <caption><strong>Rooms</strong> </caption>
        <thead>
            <tr>
                <th>Room ID</th>
                <th>Room Type ID</th>
                <th>Room Number</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
        </thead>
        <tbody>
            {rooms.map((room, i) => 
                <Room 
                    room={room_id} 
                    key={i}
                    onDelete={onDelete}
                    onEdit={onEdit} 
                />)}
        </tbody>
    </table>
  );
}

export default Rooms;