import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';


function Month({ current, setCurrent }) {
  const calendarRef = useRef(null);
  const [pendingDate, setPendingDate] = useState(null);

  // 状態更新はuseEffectで行う
  useEffect(() => {
    if (pendingDate && setCurrent) {
      if (!current || pendingDate.getTime() !== current.getTime()) {
        setCurrent(pendingDate);
      }
      setPendingDate(null);
    }
  }, [pendingDate, setCurrent, current]);

  // FullCalendarの月変更時にpendingDateにセット
  const handleDatesSet = (arg) => {
    const newDate = new Date(arg.start);
    const thisMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1);
    thisMonth.setHours(0, 0, 0, 0);
    setPendingDate(thisMonth);
  };

  return (
    <div className="month-calendar">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={jaLocale}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: '',
        }}
        height="auto"
        initialDate={current}
        datesSet={handleDatesSet}
      />
    </div>
  );
}

export default Month;