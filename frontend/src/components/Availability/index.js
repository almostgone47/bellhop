import React, {useState} from 'react';
import axios from 'axios';

import './Availability.css';

const Availability = () => {
  const [roomTypes, setRoomTypes] = useState([
    Array.from({length: 30}, () => []),
    Array.from({length: 30}, () => []),
  ]);

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
        {roomTypes.length > 0 ? (
          roomTypes.map((roomType, index) => (
            <>
              <div key={index} className="room-type">
                {roomType.map((day, index) => (
                  <div key={index} className="room-type-day">
                    <p style={{paddingBottom: '5px'}}>12</p>
                    <p>$55</p>
                  </div>
                ))}
                ,
              </div>
              <br />,
            </>
          ))
        ) : (
          <p>No rooms available for the selected dates.</p>
        )}
      </div>
    </div>
  );
};

export default Availability;
