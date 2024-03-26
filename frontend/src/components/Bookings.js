import React from 'react';

import {useBookingModal} from '../hooks/useBookingModal';

function Bookings({bookings, onDelete}) {
  const {setBookingId, setIsModalOpen} = useBookingModal();

  const openModal = (bookingId) => {
    setBookingId(bookingId);
    setIsModalOpen(true);
  };

  const getBadge = (status) => {
    if (status === 'arriving') {
      return 'arriving';
    } else if (status === 'checkedin unpaid') {
      return 'unpaid';
    } else if (status === 'checkedin paid') {
      return 'paid';
    } else {
      return 'checkedout';
    }
  };

  return (
    <table id="bookings">
      <thead>
        <tr>
          <th>Guest Name</th>
          <th>Room Numbers</th>
          <th>Total Paid</th>
          <th>Arrival Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <>
          {bookings.map((booking, i) => (
            <tr
              key={booking.booking_id}
              onClick={() => openModal(booking.booking_id)}
              className="high-light-row"
            >
              <td>{booking.guest_name}</td>
              <td>{booking.room_numbers}</td>
              <td>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(booking.total_paid)}
              </td>
              <td>
                {new Date(booking.arrival_date).toLocaleString('en-US', {
                  dateStyle: 'long',
                })}
              </td>
              <td style={{width: '165px'}}>
                <span className={getBadge(booking.status) + ' badge'}>
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
}

export default Bookings;
