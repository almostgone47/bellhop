import {React, useState, useEffect} from 'react';

import Bookings from '../components/Bookings';
import Calendar from '../components/Calendar';
import Availability from '../components/Availability';
import ViewToggle from '../components/ViewToggle';
import CreateBookingModal from '../components/Bookings/CreateBookingModal';
import EditBookingModal from '../components/Bookings/EditBookingModal';
import {useBookings} from '../hooks/useBookings';
import {useBookingModal} from '../hooks/useBookingModal';

function BookingsPage() {
  const {bookings, getBookings, deleteBooking} = useBookings();
  const {isModalOpen, openModal} = useBookingModal();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('calendar');

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const onDeleteBooking = async (id) => {
    deleteBooking(id);
    setIsCreateModalOpen(false);
  };

  const toggleModal = (newBooking, date) => {
    newBooking.start_date = date;
    openModal(newBooking);
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
        {bookings.length > 0 ? (
          <>
            {selectedView === 'day view' && (
              <Bookings bookings={bookings} onDelete={onDeleteBooking} />
            )}
            {selectedView === 'calendar' && (
              <Calendar bookings={bookings} onNewBooking={toggleModal} />
            )}
            {selectedView === 'availability' && (
              <Availability bookings={bookings} onNewBooking={toggleModal} />
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
