import React from 'react';

import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';

function Booking({booking, onEdit, onDelete}) {
  return (
    <tr>
      <td>{booking.booking_id}</td>
      <td>{booking.customer_id}</td>
      <td>{booking.total_paid}</td>
      <td>
        {new Date(booking.date_created).toLocaleString('en-US', {
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
