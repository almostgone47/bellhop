import React from 'react';
import Booking from './Booking';

function Bookings({bookings, onDelete, onEdit}) {
  return (
    <table id="bookings">
      <caption>Add and Edit Bookings</caption>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Customer ID</th>
          <th>Total Paid</th>
          <th>Date Created</th>
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
