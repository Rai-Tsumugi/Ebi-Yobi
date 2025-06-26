'use client';

import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import lectures from '../../mocks/lectures.jsx';
import timeSchedule from '../../mocks/timeSchedule.jsx';

// lecturesとtimeScheduleからFullCalendar用イベントを生成
const dayMap = {
  '月曜': '1',
  '火曜': '2',
  '水曜': '3',
  '木曜': '4',
  '金曜': '5',
  '土曜': '6',
  '日曜': '0',
};

function getEventTime(period) {
  const time = timeSchedule.find(t => t.period === period);
  return time ? { start: time.start, end: time.end } : { start: '00:00', end: '00:00' };
}

const events = lectures.map(lec => {
  const dow = dayMap[lec.schedule.day];
  const { start, end } = getEventTime(lec.schedule.period);
  return {
    title: `${lec.name} (${lec.teacher})`,
    daysOfWeek: [dow], // 0:日曜, 1:月曜...
    startTime: start,
    endTime: end,
    extendedProps: {
      room: lec.room,
      credits: lec.credits,
      description: lec.description,
    },
  };
});

const getViewName = () => (typeof window !== 'undefined' && window.innerWidth <= 900 ? 'timeGridThreeDay' : 'timeGridWeek');

const Week = ({ current, setCurrent }) => {
  const calendarRef = useRef(null);
  const [viewName, setViewName] = useState(getViewName());
  const [pendingDate, setPendingDate] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newView = getViewName();
      setViewName(prev => {
        if (prev !== newView) {
          if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.changeView(newView);
          }
          return newView;
        }
        return prev;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 状態更新はuseEffectで行う
  useEffect(() => {
    if (pendingDate && setCurrent) {
      if (!current || pendingDate.getTime() !== current.getTime()) {
        setCurrent(pendingDate);
      }
      setPendingDate(null);
    }
  }, [pendingDate, setCurrent, current]);

  // FullCalendarの週移動時にpendingDateにセット
  const handleDatesSet = (arg) => {
    const newDate = new Date(arg.start);
    newDate.setHours(0, 0, 0, 0);
    setPendingDate(newDate);
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView={viewName}
        locale={jaLocale}
        initialDate={current}
        datesSet={handleDatesSet}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: '',
        }}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        events={events}
        height="auto"
        nowIndicator={true}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        eventContent={renderEventContent}
        views={{
          timeGridThreeDay: {
            type: 'timeGrid',
            duration: { days: 3 },
            buttonText: '3日間',
          },
        }}
      />
    </div>
  );
};

// イベント表示内容のカスタマイズ
function renderEventContent(eventInfo) {
  return (
    <div>
      <b>{eventInfo.event.title}</b>
      <div style={{ fontSize: '0.8em' }}>{eventInfo.event.extendedProps.room}</div>
    </div>
  );
}

export default Week;