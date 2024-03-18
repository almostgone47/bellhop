import {React, useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Bookings from '../components/Bookings';
import Calendar from '../components/Calendar';
import ViewToggle from '../components/ViewToggle';
import CreateBookingModal from '../components/CreateBookingModal';
import EditBookingModal from '../components/EditBookingModal';
import {useBookings} from '../hooks/useBookings';
import {useBooking} from '../hooks/useBookingModal';
import Row from '../components/Row';

function BookingsPage() {
  const {bookings, getBookings, deleteBooking} = useBookings();
  const {isModalOpen} = useBooking();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');

  useEffect(() => {
    getBookings();
  }, [isModalOpen]);

  const onDeleteBooking = async (id) => {
    deleteBooking(id);
    setIsCreateModalOpen(false);
  };

  const toggleModal = () => {
    setIsCreateModalOpen(!isModalOpen);
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
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
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
