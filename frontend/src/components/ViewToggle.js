import React, {useState} from 'react';

const ViewToggle = ({selectedView, setSelectedView}) => {
  const [startDate, setStartDate] = useState('');

  return (
    <div className="view-toggle">
      <button type="submit">Today</button>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <button
        className={`toggle-btn ${selectedView === 'calendar' && 'selected'}`}
        onClick={() => setSelectedView('calendar')}
      >
        Calendar
      </button>
      <button
        className={`toggle-btn ${selectedView === 'day view' && 'selected'}`}
        onClick={() => setSelectedView('day view')}
      >
        Day View
      </button>
      <button
        className={`toggle-btn ${
          selectedView === 'availability' && 'selected'
        }`}
        onClick={() => setSelectedView('availability')}
      >
        Availability
      </button>
    </div>
  );
};

export default ViewToggle;
