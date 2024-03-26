import React, {createContext, useState, useContext} from 'react';

const BookingContext = createContext();

export const BookingModalProvider = ({children}) => {
  const [bookingId, setBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [booking, setBooking] = useState({
    guest_name: '',
    status: 'arriving',
    email: '',
    address: '',
    total_paid: '',
    booking_date: new Date().toISOString().split('T')[0],
    room_bookings: [
      {
        start_date: '',
        end_date: '',
        room_type_id: 1,
        room_number: '',
        price: 0.0,
      },
    ],
  });

  const openModal = (roomData) => {
    console.log('clearing state:::: ');
    clearState();
    setIsModalOpen(true);
    const newBooking = {
      guest_name: '',
      status: 'arriving',
      email: '',
      address: '',
      total_paid: '',
      booking_date: new Date().toISOString().split('T')[0],
      room_bookings: [roomData],
    };
    setBooking(newBooking);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearState();
  };

  const clearState = () => {
    setBookingId(null);
    setBooking({
      guest_name: '',
      status: 'arriving',
      email: '',
      address: '',
      total_paid: '',
      booking_date: new Date().toISOString().split('T')[0],
      room_bookings: [
        {
          start_date: '',
          end_date: '',
          room_type_id: 1,
          room_number: '',
          price: 0.0,
        },
      ],
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        bookingId,
        isModalOpen,
        setBookingId,
        setBooking,
        setIsModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingModal = () => {
  return useContext(BookingContext);
};
