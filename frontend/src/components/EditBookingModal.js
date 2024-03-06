import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

import Modal from './Modal';
import Row from './Row';
import FormItem from './FormItem';

function EditBookingModal({bookingId, onDelete, isModalOpen, setIsModalOpen}) {
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
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

  useEffect(() => {
    if (isModalOpen && bookingId) {
      getBooking();
    }
  }, [isModalOpen, bookingId]);

  const getBooking = async () => {
    try {
      const res = await axios.get(`/bookings/${bookingId}`);
      setBooking(res.data);
    } catch (error) {
      console.log('Error fetching booking:', error);
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

  const onEditBooking = async (booking) => {
    try {
      await axios.put(`/bookings/${booking.booking_id}`, booking);
      toast.success('Booking updated successfully!');
      setIsModalOpen(false);
      navigate('/');
    } catch (error) {
      toast.error(`Failed to update booking: ${error.message}`);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
              <label>Booking Date:</label>
              <input
                type="text"
                readOnly
                value={new Date(booking.booking_date).toLocaleDateString()}
              />
            </FormItem>
          </Row>
          <Row>
            <FormItem>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                name="email"
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
                style={{width: '222px'}}
              >
                <option value="arriving">Arriving</option>
                <option value="checkedin unpaid">Checked In Unpaid</option>
                <option value="checkedin paid">Checked In Paid</option>
                <option value="checked out">Checked Out</option>
              </select>
            </FormItem>
          </Row>
          <h3>Rooms Booked</h3>
          <hr />
          {booking.room_bookings.map((room_booking, index) => (
            <div key={index}>
              <h4>Room {index + 1}</h4>
              <Row>
                <FormItem>
                  <label>Room Type:</label>
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
                  <label>Room Number:</label>
                  <select
                    name="room_numbers"
                    value={room_booking.room_number}
                    onChange={(e) => handleRBChange(e, index)}
                  >
                    <option value={101}>101</option>
                    <option value={102}>102</option>
                    <option value={103}>103</option>
                    <option value={104}>104</option>
                    <option value={105}>105</option>
                    <option value={201}>201</option>
                    <option value={202}>202</option>
                    <option value={203}>203</option>
                    <option value={204}>204</option>
                    <option value={205}>205</option>
                  </select>
                </FormItem>
              </Row>
              <Row>
                <FormItem>
                  <label>Arrival Date:</label>
                  <input
                    type="date"
                    name="start_date"
                    onChange={(e) => handleRBChange(e, index)}
                    value={
                      booking.start_date && booking.start_date.slice(0, 10)
                    }
                  />
                </FormItem>
                <FormItem>
                  <label>Departure Date:</label>
                  <input
                    type="date"
                    name="end_date"
                    onChange={(e) => handleRBChange(e, index)}
                    value={booking.end_date && booking.end_date.slice(0, 10)}
                  />
                </FormItem>
              </Row>
              <hr />
            </div>
          ))}
          <Row>
            <button onClick={() => onDelete(bookingId)}>
              <FaRegTrashAlt />
              Cancel Booking
            </button>
            <button onClick={() => onEditBooking(booking)}>
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

export default EditBookingModal;
