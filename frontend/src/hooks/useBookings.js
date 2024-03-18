import React, {createContext, useState, useContext} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const BookingsContext = createContext();

export const BookingsProvider = ({children}) => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get('/bookings');
      setBookings(res.data);
    } catch ({error}) {
      console.log('Failed to load bookings:', error);
      toast.error('Failed to load bookings: ' + error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      axios.delete(`/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking.booking_id !== id));
      toast.success('Booking Deleted');
    } catch (error) {
      console.log('Error deleting booking:', error);
      toast.error('Error: Could not delete booking');
    }
  };

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        getBookings,
        deleteBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  return useContext(BookingsContext);
};
