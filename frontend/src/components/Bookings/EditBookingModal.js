import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FaEdit, FaRegTrashAlt, FaPlusCircle} from 'react-icons/fa';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

import Modal from '../Modal';
import Header from '../Header';
import Row from '../Row';
import GuestFormItem from '../GuestFormItem';
import FormItem from '../FormItem';
import {useBookingModal} from '../../hooks/useBookingModal';
import {useBookings} from '../../hooks/useBookings';

// X make bookings so they cannot over lap on the calendar
// X create the availability page
// X add date selector
// wire up availability page
// make get bookings, get bookings by date range
// make create booking, drag to select
// make edit, booking drag and drop
// make the set prices page
// make the cash register

function BookingModal({onDelete}) {
  const {isOverlapBooking} = useBookings();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const {
    booking,
    setBooking,
    bookingId,
    isModalOpen,
    closeModal,
    setIsModalOpen,
  } = useBookingModal();

  useEffect(() => {
    if (isModalOpen && bookingId) {
      getBooking();
    }
    const getRooms = async () => {
      const fetchedRooms = await fetchRooms();
      setRooms(fetchedRooms);
    };

    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, bookingId]);

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

  const editBooking = async (booking) => {
    if (!isOverlapBooking(booking)) {
      try {
        await axios.put(`/bookings/${booking.booking_id}`, booking);
        toast.success('Booking updated successfully!');
        setIsModalOpen(false);
        navigate('/');
      } catch (error) {
        toast.error(`Failed to update booking: ${error.message}`);
      }
    }
  };

  const deleteBooking = () => {
    onDelete(bookingId);
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => closeModal()}>
      {booking ? (
        <div>
          <h3 className="modalHeader">Booking Details</h3>
          <hr />
          <Row>
            <GuestFormItem>
              <label htmlFor="guest_name">Guest Name</label>
              <input
                id="guest_name"
                type="text"
                name="guest_name"
                value={booking.guest_name}
                onChange={handleChange}
              />
            </GuestFormItem>
            <GuestFormItem>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={booking.email}
                onChange={handleChange}
              />
            </GuestFormItem>
            <GuestFormItem>
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                name="address"
                value={booking.address}
                onChange={handleChange}
              />
            </GuestFormItem>
          </Row>
          <Row>
            <GuestFormItem>
              <label htmlFor="total_paid">Total Paid</label>
              <input
                id="total_paid"
                type="text"
                name="total_paid"
                value={booking.total_paid}
                onChange={handleChange}
              />
            </GuestFormItem>
            <GuestFormItem>
              <label htmlFor="status">Status</label>
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
            </GuestFormItem>
          </Row>
          <Row>
            <h3>Rooms Booked</h3>
            <button onClick={addRoom}>
              <FaPlusCircle /> Add Room
            </button>
          </Row>
          <hr />
          <Header>
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
          </Header>
          {booking.room_bookings.map((room_booking, index) => (
            <div key={index}>
              <Row>
                {booking.room_bookings.length > 1 && (
                  <FaRegTrashAlt onClick={removeRoom} />
                )}
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
                    {rooms.map((room, i) => (
                      <option key={i} value={Number(room.room_id)}>
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
                <FormItem>
                  <div className="date-booked">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(room_booking.booked_price)}
                  </div>
                </FormItem>
              </Row>
            </div>
          ))}
          <Row>
            <button
              onClick={() => deleteBooking()}
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
              onClick={() => editBooking(booking)}
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

export default BookingModal;
