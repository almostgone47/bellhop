import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {FaRegTrashAlt} from 'react-icons/fa';

const AddBookingPage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    customerId: '',
    roomBookings: [{room_type_id: '', start_date: '', end_date: ''}],
  });

  const addRoomBooking = () => {
    setBooking({
      ...booking,
      roomBookings: [
        ...booking.roomBookings,
        {
          room_type_id: '',
          start_date: '',
          end_date: '',
        },
      ],
    });
  };

  const removeRoomBooking = (index) => {
    const newRoomBookings = [...booking.roomBookings];
    newRoomBookings.splice(index, 1);
    setBooking({
      ...booking,
      roomBookings: newRoomBookings,
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
    const res = await axios.post('/bookings', {booking});
    if (res.status === 200) {
      setBooking({
        customerId: '',
        roomBookings: [{room_type_id: '', start_date: '', end_date: ''}],
      });
      toast.success('Booking successfully added!');
      navigate('/');
    } else {
      toast.error('Failed to add booking.');
    }
  };

  return (
    <section className="content-area">
      <h2>Add a Booking</h2>
      <div>
        <input
          type="text"
          placeholder="Customer ID"
          name="customerId"
          value={booking.customerId}
          onChange={changeHandler}
        />
      </div>
      {booking.roomBookings.map((roomBooking, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Room Type ID"
            name={`roomBookings.room_type_id`}
            value={roomBooking.room_type_id}
            onChange={(e) => changeHandler(e, index)}
          />
          <input
            type="date"
            placeholder="Start Date"
            name={`roomBookings.start_date`}
            value={roomBooking.start_date}
            onChange={(e) => changeHandler(e, index)}
          />
          <input
            type="date"
            placeholder="End Date"
            name={`roomBookings.end_date`}
            value={roomBooking.end_date}
            onChange={(e) => changeHandler(e, index)}
          />
          <FaRegTrashAlt
            onClick={() => removeRoomBooking(index)}
            style={{cursor: 'pointer', marginLeft: '10px'}}
          />
        </div>
      ))}
      <div id="addBookingBtns">
        <button onClick={addRoomBooking}>Add Another Room</button>
        <button onClick={addBooking}>Submit Booking</button>
      </div>
    </section>
  );
};

export default AddBookingPage;
