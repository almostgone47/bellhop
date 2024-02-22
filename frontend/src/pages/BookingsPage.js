import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

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
      const response = await fetch('/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    }
  };

  const onEditBooking = async (booking) => {
    redirect('/updateBooking', {state: {booking}});
  };

  const onDeleteBooking = async (id) => {
    try {
      const response = await fetch(`/bookings/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setBookings(bookings.filter((booking) => booking.id !== id));
      } else {
        throw new Error(`Failed to delete booking with ID: ${id}`);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
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
      <Bookings
        bookings={bookings}
        onEdit={onEditBooking}
        onDelete={onDeleteBooking}
      />
    </section>
  );
}

export default BookingsPage;
