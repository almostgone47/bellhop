import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import Bookings from '../components/Bookings';
import {FaPlusCircle} from 'react-icons/fa';

function BookingsPage() {
  const redirect = useNavigate();
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

  const onEditBooking = async (booking) => {
    redirect('/updateBooking', {state: {booking}});
  };

  const onDeleteBooking = async (id) => {
    try {
      await axios.delete(`/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking.booking_id !== id));
      toast.success('Booking Deleted');
    } catch (error) {
      console.log('Error deleting booking:', error);
      toast.error('Error: Could not delete booking');
    }
  };

  return (
    <section className="content-area">
      <h2>Bookings</h2>
      <p id="addBookingBtn">
        <Link to="/createBooking">
          <FaPlusCircle />
          Add Booking
        </Link>
      </p>
      {bookings.length > 0 ? (
        <Bookings
          bookings={bookings}
          onEdit={onEditBooking}
          onDelete={onDeleteBooking}
        />
      ) : (
        <p>No bookings available.</p>
      )}
    </section>
  );
}

export default BookingsPage;
