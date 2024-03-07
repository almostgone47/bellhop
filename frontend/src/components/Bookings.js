import React, {useState} from 'react';

import BookingModal from './EditBookingModal';

function Bookings({bookings, onDelete}) {
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  return (
    <table id="bookings">
      <caption>Click on a booking to view and edit</caption>
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
          <BookingModal
            bookingId={selectedBookingId}
            onDelete={onDelete}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          {bookings.map((booking, i) => (
            <tr
              key={booking.booking_id}
              onClick={() => openModal(booking.booking_id)}
              className="high-light-row"
            >
              <td>{booking.guest_name}</td>
              <td>{booking.room_numbers}</td>
              <td>{booking.total_paid}</td>
              <td>
                {new Date(booking.arrival_date).toLocaleString('en-US', {
                  dateStyle: 'long',
                })}
              </td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </>
      </tbody>
    </table>
  );
}

export default Bookings;
