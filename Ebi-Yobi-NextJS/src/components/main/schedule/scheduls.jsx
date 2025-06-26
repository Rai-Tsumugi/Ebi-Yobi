import React from 'react';
import './schedule.css';
import Week from '../carender/week.jsx';
import Month from '../carender/month.jsx';

function Schedule({
  view, setView,
  currentWeek, setCurrentWeek,
  currentMonth, setCurrentMonth
}) {
  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Myスケジュール</h2>
      <div className="view-toggle">
        <button
          className={view === 'week' ? 'active' : ''}
          onClick={() => setView('week')}
        >
          week
        </button>
        <button
          className={view === 'month' ? 'active' : ''}
          onClick={() => setView('month')}
        >
          month
        </button>
      </div>
      <div className="view-content">
        {view === 'week' ? (
          <Week current={currentWeek} setCurrent={setCurrentWeek} />
        ) : (
          <Month current={currentMonth} setCurrent={setCurrentMonth} />
        )}
      </div>
    </div>
  );
}

export default Schedule;