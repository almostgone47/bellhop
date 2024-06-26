import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FaEdit, FaRegTrashAlt, FaPlusCircle} from 'react-icons/fa';
import toast from 'react-hot-toast';

import Modal from '../Modal';
import Row from '../Row';
import FormItem from '../FormItem';
import {useBookingModal} from '../../hooks/useBookingModal';

function CreateBookingModal({isModalOpen}) {
  const {booking, setBooking, openModal} = useBookingModal();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      const fetchedRooms = await fetchRooms();
      setRooms(fetchedRooms);
    };

    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/rooms');
      return res.data;
    } catch (error) {
      toast.error('Error fetching room types:', error);
      console.log('Error fetching room types:', error);
      return [];
    }
  };

  const handleRBChange = (e, index) => {
    const updatedRoomBookings = booking.room_bookings.map((roomBooking, i) => {
      if (i === index) {
        if (e.target.name === 'start_date' || e.target.name === 'end_date') {
          return {
            ...roomBooking,
            [e.target.name]: e.target.value.slice(0, 10),
          };
        }

        return {
          ...roomBooking,
          [e.target.name]: e.target.value,
        };
      }
      return roomBooking;
    });

    setBooking({
      ...booking,
      room_bookings: updatedRoomBookings,
    });
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const addRoom = () => {
    setBooking({
      ...booking,
      room_bookings: [
        ...booking.room_bookings,
        {start_date: '', end_date: '', room_type_id: 1, room_number: ''},
      ],
    });
  };

  const removeRoom = (index) => {
    if (booking.room_bookings.length > 1) {
      const updatedRoomBookings = booking.room_bookings.slice(index, 1);
      setBooking({
        ...booking,
        room_bookings: updatedRoomBookings,
      });
    }
  };

  const onSave = async () => {
    try {
      await axios.post(`/bookings`, booking);
      toast.success('Booking saved successfully!');
      openModal();
      navigate('/');
    } catch (error) {
      toast.error(`Failed to update booking: ${error.message}`);
    }
  };

  const onCancel = () => {
    setBooking({
      guest_name: '',
      status: '',
      email: '',
      address: '',
      total_paid: '',
      booking_date: '',
      room_bookings: [
        {start_date: '', end_date: '', room_type_id: 1, room_number: ''},
      ],
    });
    openModal();
    navigate('/');
  };
  console.log('booking: ', booking);
  return (
    <Modal isOpen={isModalOpen} onClose={() => openModal()}>
      {booking ? (
        <div>
          <h3 className="modalHeader">Booking Details</h3>
          <hr />
          <Row>
            <FormItem>
              <label htmlFor="guest_name">Guest Name:</label>
              <input
                id="guest_name"
                type="text"
                name="guest_name"
                value={booking.guest_name}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="booking.email"
                value={booking.email}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                type="text"
                name="address"
                value={booking.address}
                onChange={handleChange}
              />
            </FormItem>
          </Row>
          <Row>
            <FormItem>
              <label htmlFor="total_paid">Total Paid:</label>
              <input
                id="total_paid"
                type="text"
                name="total_paid"
                value={booking.total_paid}
                onChange={handleChange}
              />
            </FormItem>
            <FormItem>
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                value={booking.status}
                name="status"
                onChange={handleChange}
              >
                <option value="arriving">Arriving</option>
                <option value="checkedin unpaid">Checked In Unpaid</option>
                <option value="checkedin paid">Checked In Paid</option>
                <option value="checked out">Checked Out</option>
              </select>
            </FormItem>
          </Row>
          <Row>
            <h3>Rooms Booked</h3>
            <button onClick={addRoom}>
              <FaPlusCircle /> Add Room
            </button>
          </Row>
          <hr />
          <Row>
            <FormItem>
              <label></label>
            </FormItem>
            <FormItem>
              <label>Room Type</label>
            </FormItem>
            <FormItem>
              <label>Room Number</label>
            </FormItem>
            <FormItem>
              <label>Arrival Date</label>
            </FormItem>
            <FormItem>
              <label>Departure Date</label>
            </FormItem>
            <FormItem>
              <label>Price</label>
            </FormItem>
          </Row>
          {booking.room_bookings.map((room_booking, index) => (
            <div key={room_booking.room_booking_id}>
              <Row>
                <FormItem>
                  {booking.room_bookings.length > 1 && (
                    <FaRegTrashAlt onClick={removeRoom} />
                  )}
                </FormItem>
                <FormItem>
                  <select
                    name="room_type_id"
                    value={room_booking.room_type_id}
                    onChange={(e) => handleRBChange(e, index)}
                  >
                    <option value={1}>Standard</option>
                    <option value={2}>Deluxe</option>
                  </select>
                </FormItem>
                <FormItem>
                  <select
                    name="room_id"
                    value={room_booking.room_id}
                    onChange={(e) => handleRBChange(e, index)}
                  >
                    {rooms.map((room) => (
                      <option key={room.room_id} value={room.room_id}>
                        {room.room_number}
                      </option>
                    ))}
                  </select>
                </FormItem>
                <FormItem>
                  <input
                    type="date"
                    name="start_date"
                    onChange={(e) => handleRBChange(e, index)}
                    value={
                      room_booking.start_date
                        ? room_booking.start_date.slice(0, 10)
                        : ''
                    }
                  />
                </FormItem>
                <FormItem>
                  <input
                    type="date"
                    name="end_date"
                    onChange={(e) => handleRBChange(e, index)}
                    value={
                      room_booking.end_date
                        ? room_booking.end_date.slice(0, 10)
                        : ''
                    }
                  />
                </FormItem>
                {console.log('ROOMBOOKING: ', room_booking)}
                <FormItem>
                  <input
                    className="date-booked"
                    name="room_booking.price"
                    value={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(room_booking.price)}
                  />
                </FormItem>
              </Row>
              <hr />
            </div>
          ))}
          <Row>
            <button
              onClick={() => onCancel()}
              style={{
                width: '140px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FaRegTrashAlt />
              Cancel Booking
            </button>
            <button
              onClick={() => onSave(booking)}
              style={{
                width: '140px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <FaEdit />
              Save Changes
            </button>
          </Row>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Modal>
  );
}

export default CreateBookingModal;
