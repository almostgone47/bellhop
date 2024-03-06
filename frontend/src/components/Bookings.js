import React from 'react';
import Booking from './Booking';

function Bookings({bookings, onDelete, onEdit}) {
  return (
    <table id="bookings">
      <caption>Add and Edit Bookings</caption>
      <thead>
        <tr>
          <th>Guest Name</th>
          <th>Room Numbers</th>
          <th>Total Paid</th>
          <th>Arrival Date</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, i) => (
          <Booking
            booking={booking}
            key={i}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Bookings;
