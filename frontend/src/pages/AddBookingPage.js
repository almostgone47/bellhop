import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AddBookingPageTable = () => {
  const [booking, setBooking] = useState({
    customer: {id: '', name: ''},
    dateCreated: new Date().toISOString().slice(0, 10),
    roomBookings: [
      {roomTypeId: '', startDate: '', endDate: '', nights: '', bookedPrice: ''},
    ],
  });

  const navigate = useNavigate();

  const addRoomBooking = () => {
    setBooking({
      ...booking,
      roomBookings: [
        ...booking.roomBookings,
        {
          roomTypeId: '',
          startDate: '',
          endDate: '',
          nights: '',
          bookedPrice: '',
        },
      ],
    });
  };

  const changeHandler = (e, index) => {
    if (e.target.name.startsWith('roomBookings')) {
      const {name, value} = e.target;
      const fieldName = name.split('.')[1];
      const updatedRoomBookings = booking.roomBookings.map((roomBooking, i) =>
        i === index ? {...roomBooking, [fieldName]: value} : roomBooking,
      );
      setBooking({...booking, roomBookings: updatedRoomBookings});
    } else {
      setBooking({...booking, [e.target.name]: e.target.value});
    }
  };

  const addBooking = async () => {
    const response = await fetch('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      alert('Booking successfully added!');
      navigate('/bookings');
    } else {
      alert(`Failed to add booking. Status: ${response.status}`);
    }
  };

  return (
    <section className="content-area">
      <h2>Add a Booking</h2>
      <div>
        <input
          type="text"
          placeholder="Customer ID"
          name="customer.id"
          value={booking.customer.id}
          onChange={changeHandler}
        />
        <input
          type="text"
          placeholder="Customer Name"
          name="customer.name"
          value={booking.customer.name}
          onChange={changeHandler}
        />
      </div>
      {booking.roomBookings.map((roomBooking, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Room Type ID"
            name={`roomBookings.roomTypeId`}
            value={roomBooking.roomTypeId}
            onChange={(e) => changeHandler(e, index)}
          />
          <input
            type="date"
            placeholder="Start Date"
            name={`roomBookings.startDate`}
            value={roomBooking.startDate}
            onChange={(e) => changeHandler(e, index)}
          />
          <input
            type="date"
            placeholder="End Date"
            name={`roomBookings.endDate`}
            value={roomBooking.endDate}
            onChange={(e) => changeHandler(e, index)}
          />
        </div>
      ))}
      <div>
        <button onClick={addRoomBooking}>Add Another Room</button>
        <button onClick={addBooking}>Submit Booking</button>
      </div>
    </section>
  );
};

export default AddBookingPageTable;
