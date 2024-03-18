import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import {useBooking} from '../../hooks/useBookingModal';
import './Calendar.css';

const Calendar = ({bookings, onNewBooking}) => {
  const [rooms, setRooms] = useState([]);
  const {setBookingId, setIsModalOpen, isModalOpen} = useBooking();

  useEffect(() => {
    const getRooms = async () => {
      const fetchedRooms = await fetchRooms();
      setRooms(fetchedRooms);
    };
    getRooms();
  }, [isModalOpen]);

  const openModal = (bookingId) => {
    setBookingId(bookingId);
    setIsModalOpen(true);
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/rooms');
      return res.data;
    } catch (error) {
      toast.error('Error fetching room types:', error);
      console.log('Error fetching room types:', error);
      return [];
    }
  };

  const generateDays = () => {
    const days = [];
    for (let i = 0; i < 30; i++) {
      const day = new Date();
      day.setDate(day.getDate() + i);
      const dayOfMonth = day.getDate();
      const date = day.toISOString().split('T')[0];
      const dayOfWeek = day.toLocaleString('en-us', {weekday: 'short'});
      days.push({date, dayOfWeek, dayOfMonth});
    }
    return days;
  };

  const days = generateDays();

  const getBookingSpan = (booking, days) => {
    const startIndex = days.findIndex((day) => day.date === booking.start_date);
    const endIndex = days.findIndex((day) => day.date === booking.end_date);
    return {
      start: startIndex,
      span: endIndex - startIndex + 1,
    };
  };

  const assignBookingsToRows = (bookings) => {
    let visualRows = Array.from({length: rooms.length}, () => []);

    bookings.forEach((booking) => {
      const {start, span} = getBookingSpan(booking, days);
      const end = start + span - 1;

      const rowIndex = visualRows.findIndex(
        (row) =>
          !row.some((b) => {
            const bEnd = b.start + b.span - 1;
            return start <= bEnd && end >= b.start;
          }),
      );

      if (rowIndex !== -1) {
        visualRows[rowIndex].push({...booking, start, span});
      }
    });

    return visualRows;
  };

  const visualRoomBookings = bookings.flatMap((booking) => {
    return booking.room_bookings.map((rb) => ({
      ...rb,
      guest_name: booking.guest_name,
      status: booking.status,
      bookingId: booking.booking_id,
    }));
  });

  const roomsWithBookings = assignBookingsToRows(visualRoomBookings);

  return (
    <div className="calendar">
      <div className="days-of-week">
        <div className="room-number-header">Room</div>
        {days.map((day, i) => (
          <div key={i} className="day-of-week">
            <span className="day-of-month">{day.dayOfMonth}</span>
            <span>{day.dayOfWeek}</span>
          </div>
        ))}
      </div>
      {roomsWithBookings.map((room, i) => (
        <>
          <div key={i} className="room">
            <div className="days">
              <div className="room-number">{rooms[i].room_number}</div>
              {days.map((day) => (
                <div key={day.date} className="day" onClick={onNewBooking}>
                  {day.date}
                </div>
              ))}
            </div>
            {room.map((booking, index) => (
              <div
                key={index}
                onClick={() => openModal(booking.bookingId)}
                className={'booking ' + booking.status}
                style={{
                  top: `${45 + (Number(booking.room_id) - 1) * 50}px`,
                  left: `${80 + booking.start * 50}px`,
                  width: `${booking.span * 50}px`,
                }}
              >
                {booking.guest_name}
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Calendar;
