import {React, useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import Bookings from '../components/Bookings';
import CreateBookingModal from '../components/CreateBookingModal';
import {FaPlusCircle} from 'react-icons/fa';

function BookingsPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await axios.get('/bookings');
      console.log('data::', res.data);
      setBookings(res.data);
    } catch ({error}) {
      console.log('Failed to load bookings:', error);
      toast.error('Failed to load bookings: ' + error);
    }
  };

  const onDeleteBooking = async (id) => {
    try {
      axios.delete(`/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking.booking_id !== id));
      setIsModalOpen(false);
      toast.success('Booking Deleted');
    } catch (error) {
      console.log('Error deleting booking:', error);
      toast.error('Error: Could not delete booking');
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="content-area">
      <CreateBookingModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <h2>Bookings</h2>
      <button id="addBookingBtn" onClick={toggleModal}>
        <FaPlusCircle />
        Add Booking
      </button>
      {bookings.length > 0 ? (
        <Bookings bookings={bookings} onDelete={onDeleteBooking} />
      ) : (
        <p>No bookings available.</p>
      )}
    </section>
  );
}

export default BookingsPage;
