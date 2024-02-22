import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {FaRegTrashAlt} from 'react-icons/fa';

const AddBookingPage = () => {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    customerId: '',
    roomBookings: [{roomTypeId: '', startDate: '', endDate: ''}],
  });

  const addRoomBooking = () => {
    setBooking({
      ...booking,
      roomBookings: [
        ...booking.roomBookings,
        {
          roomTypeId: '',
          startDate: '',
          endDate: '',
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
    console.log('res: ', res);
    if (res.status === 200) {
      setBooking({
        customerId: '',
        roomBookings: [{roomTypeId: '', startDate: '', endDate: ''}],
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
