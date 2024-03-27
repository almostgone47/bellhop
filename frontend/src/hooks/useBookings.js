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

  const isOverlapBooking = (newBooking) => {
    return bookings.some((existingBooking) => {
      return existingBooking.room_bookings.some((existingRoomBooking) => {
        return newBooking.room_bookings.some((newRoomBooking) => {
          return (
            Number(newRoomBooking.room_id) === existingRoomBooking.room_id &&
            ((newRoomBooking.start_date >= existingRoomBooking.start_date &&
              newRoomBooking.start_date <= existingRoomBooking.end_date) ||
              (newRoomBooking.end_date >= existingRoomBooking.start_date &&
                newRoomBooking.end_date <= existingRoomBooking.end_date))
          );
        });
      });
    });
  };

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        getBookings,
        deleteBooking,
        isOverlapBooking,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  return useContext(BookingsContext);
};
