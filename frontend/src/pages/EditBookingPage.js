import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditBookingPageTable = () => {
  const location = useLocation();
  const bookingToEdit = location.state.booking; 
  const [booking, setBooking] = useState(bookingToEdit);

  useEffect(() => {
    setBooking(bookingToEdit);
  }, [bookingToEdit]);

  const navigate = useNavigate();

  const editBooking = async () => {
    const response = await fetch(`/bookings/${booking.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: booking.status,
        roomBooking: booking.roomBooking,
        // Include other booking properties here
      }),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      alert('Booking and room booking updated successfully!');
      navigate('/bookings');
    } else {
      const errMessage = await response.json();
      alert(`Failed to update booking. Error: ${errMessage.error}`);
    }
  };

  const changeHandler = (e) => {
    if (e.target.name.startsWith("roomBooking.")) {
      const name = e.target.name.split(".")[1];
      setBooking({
        ...booking,
        roomBooking: {
          ...booking.roomBooking,
          [name]: e.target.value,
        },
      });
    } else {
      setBooking({
        ...booking,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <article className="content-area">
      <h2>Edit Booking</h2>
      {/* Modify the form to match booking structure */}
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={booking.status}
          onChange={changeHandler}
        />
        {/* Add inputs for room booking properties */}
        <label>Room Type ID:</label>
        <input
          type="number"
          name="roomBooking.roomTypeId"
          value={booking.roomBooking.roomTypeId}
          onChange={changeHandler}
        />
        <label>Start Date:</label>
        <input
          type="date"
          name="roomBooking.startDate"
          value={booking.roomBooking.startDate}
          onChange={changeHandler}
        />
        <label>End Date:</label>
        <input
          type="date"
          name="roomBooking.endDate"
          value={booking.roomBooking.endDate}
          onChange={changeHandler}
        />
        <label>Nights:</label>
        <input
          type="number"
          name="roomBooking.nights"
          value={booking.roomBooking.nights}
          onChange={changeHandler}
        />
        <label>Booked Price:</label>
        <input
          type="number"
          name="roomBooking.bookedPrice"
          value={booking.roomBooking.bookedPrice}
          onChange={changeHandler}
        />
        <button onClick={editBooking}>Save Changes</button>
      </div>
    </article>
  );
};

export default EditBookingPageTable;
