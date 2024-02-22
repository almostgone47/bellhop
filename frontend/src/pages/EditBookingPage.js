import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {FaRegTrashAlt} from 'react-icons/fa';

const EditBookingPage = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [booking, setBooking] = useState({
    customerId: '',
    roomBookings: [],
  });

  useEffect(() => {
    if (!state?.booking) {
      toast.error('Booking data not found.');
      navigate('/');
    } else {
      async function getRoomBookings() {
        const res = await axios.get(
          `/roomBookings/${state.booking.booking_id}`,
        );
        setBooking({
          customerId: state.booking.customer_id,
          roomBookings: [...res.data],
        });
      }
      getRoomBookings();
    }
  }, [state, navigate]);

  const addRoomBooking = () => {
    setBooking({
      ...booking,
      roomBookings: [
        ...booking.roomBookings,
        {roomTypeId: '', startDate: '', endDate: ''},
      ],
    });
  };

  const removeRoomBooking = (index) => {
    const updatedRoomBookings = booking.roomBookings.filter(
      (_, i) => i !== index,
    );
    setBooking({...booking, roomBookings: updatedRoomBookings});
  };

  const changeHandler = (e, index) => {
    const {name, value} = e.target;
    if (name.startsWith('roomBookings')) {
      const updatedRoomBookings = booking.roomBookings.map((item, i) =>
        i === index ? {...item, [name.split('.')[1]]: value} : item,
      );
      setBooking({...booking, roomBookings: updatedRoomBookings});
    } else {
      setBooking({...booking, [name]: value});
    }
  };

  const editBooking = async () => {
    try {
      await axios.put(`/bookings/${state?.booking.booking_id}`, booking);
      toast.success('Booking updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error(`Failed to update booking: ${error.message}`);
    }
  };
  console.log('booking.roomBookings?.map(:  ', booking);
  return (
    <section className="content-area">
      <h2>Edit Booking</h2>
      <div>
        <input
          type="text"
          placeholder="Customer ID"
          name="customerId"
          value={booking.customerId}
          onChange={changeHandler}
        />

        {booking?.roomBookings?.map((roomBooking, index) => (
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
              value={roomBooking.startDate.slice(0, 10)}
              onChange={(e) => changeHandler(e, index)}
            />
            <input
              type="date"
              placeholder="End Date"
              name={`roomBookings.endDate`}
              value={roomBooking.endDate.slice(0, 10)}
              onChange={(e) => changeHandler(e, index)}
            />
            <FaRegTrashAlt onClick={() => removeRoomBooking(index)} />
          </div>
        ))}
      </div>
      <div id="addBookingBtns">
        <button onClick={addRoomBooking}>Add Another Room</button>
        <button onClick={editBooking}>Submit Changes</button>
      </div>
    </section>
  );
};

export default EditBookingPage;
