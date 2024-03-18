import React from 'react';

const ViewToggle = ({selectedView, setSelectedView}) => {
  return (
    <div className="view-toggle">
      <button
        className={`toggle-btn ${
          selectedView === 'calendar' ? 'selected' : ''
        }`}
        onClick={() => setSelectedView('calendar')}
      >
        Calendar
      </button>
      <button
        className={`toggle-btn ${selectedView === 'list' ? 'selected' : ''}`}
        onClick={() => setSelectedView('list')}
      >
        List
      </button>
    </div>
  );
};

export default ViewToggle;
