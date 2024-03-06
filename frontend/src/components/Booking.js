import React from 'react';

import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';

function Booking({booking, onEdit, onDelete}) {
  return (
    <tr>
      <td>{booking.guest_name}</td>
      <td>{booking.room_numbers}</td>
      <td>{booking.total_paid}</td>
      <td>
        {new Date(booking.arrival_date).toLocaleString('en-US', {
          dateStyle: 'long',
        })}
      </td>
      <td>{booking.status}</td>
      <td>
        <FaEdit onClick={() => onEdit(booking)} />
      </td>
      <td>
        <FaRegTrashAlt onClick={() => onDelete(booking.booking_id)} />
      </td>
    </tr>
  );
}

export default Booking;
