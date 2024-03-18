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

  return (
    <BookingsContext.Provider
      value={{
        bookings,
        getBookings,
      }}
    >
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  return useContext(BookingsContext);
};
