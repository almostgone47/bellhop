import React, {useState} from 'react';
import axios from 'axios';

const Availability = () => {
  const [availableRooms, setAvailableRooms] = useState([]);

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

  return (
    <div className="calendar">
      <div className="days-of-week">
        <div className="room-number-header">Room</div>
        {days.map((day, i) => (
          <div key={day + i} className="day-of-week">
            <span className="day-of-month">{day.dayOfMonth}</span>
            <span>{day.dayOfWeek}</span>
          </div>
        ))}
      </div>

      <div>
        {availableRooms.length > 0 ? (
          availableRooms.map((room, index) => (
            <div key={index}>
              <h3>{room.type_name}</h3>
              <p>Room Number: {room.room_number}</p>
              <p>Price per Night: ${room.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No rooms available for the selected dates.</p>
        )}
      </div>
    </div>
  );
};

export default Availability;
