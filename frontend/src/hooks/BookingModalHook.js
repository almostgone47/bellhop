import React, {createContext, useState, useContext} from 'react';

const BookingContext = createContext();

export const BookingModalProvider = ({children}) => {
  const [bookingId, setBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BookingContext.Provider
      value={{
        bookingId,
        isModalOpen,
        setIsModalOpen,
        setBookingId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  return useContext(BookingContext);
};
