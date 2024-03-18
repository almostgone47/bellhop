import {React, useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Bookings from '../components/Bookings';
import Calendar from '../components/Calendar';
import ViewToggle from '../components/ViewToggle';
import CreateBookingModal from '../components/CreateBookingModal';
import EditBookingModal from '../components/EditBookingModal';
import Row from '../components/Row';
import {FaPlusCircle} from 'react-icons/fa';

function BookingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedView, setSelectedView] = useState('calendar');

  useEffect(() => {
    loadBookings();
  }, [isModalOpen]);

  const loadBookings = async () => {
    try {
      const res = await axios.get('/bookings');
      console.log('res.data: ', res.data);
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
    <>
      <div className="view-toggle-container">
        <ViewToggle
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
      </div>
      <section className="calendar-area">
        <CreateBookingModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <EditBookingModal onDelete={onDeleteBooking} />
        <Row>
          <h2>Bookings</h2>
          <p>
            Click on the calander to create a booking or click on a booking to
            edit.
          </p>
        </Row>
        {bookings.length > 0 ? (
          <>
            {selectedView === 'list' ? (
              <Bookings bookings={bookings} onDelete={onDeleteBooking} />
            ) : (
              <Calendar bookings={bookings} onNewBooking={toggleModal} />
            )}
          </>
        ) : (
          <p>No bookings available.</p>
        )}
      </section>
    </>
  );
}

export default BookingsPage;
