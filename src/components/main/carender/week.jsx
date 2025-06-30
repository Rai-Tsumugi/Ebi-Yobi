'use client';

import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import timeSchedule from '../../mocks/timeSchedule.jsx';

// lecturesとtimeScheduleからFullCalendar用イベントを生成
const dayMap = {
  MONDAY: '1',
  TUESDAY: '2',
  WEDNESDAY: '3',
  THURSDAY: '4',
  FRIDAY: '5',
  SATURDAY: '6',
  SUNDAY: '0',
};

const getViewName = () => (typeof window !== 'undefined' && window.innerWidth <= 900 ? 'timeGridThreeDay' : 'timeGridWeek');

const Week = ({ current, setCurrent }) => {
  const calendarRef = useRef(null);
  const [viewName, setViewName] = useState(getViewName());
  const [pendingDate, setPendingDate] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [events, setEvents] = useState([]);

  // 講義データをAPIから取得
  useEffect(() => {
    fetch('/api/lectures')
      .then(res => res.json())
      .then(data => setLectures(data));
  }, []);

  // lecturesからeventsを生成
  useEffect(() => {
    const evs = lectures.map(lec => {
      const dow = dayMap[lec.day];
      return {
        title: `${lec.name} (${lec.teacher})`,
        daysOfWeek: [dow],
        startTime: lec.timeSchedule.startTime,
        endTime: lec.timeSchedule.endTime,
        extendedProps: {
          room: lec.room,
          credits: lec.credits,
          description: lec.description,
        },
      };
    });
    setEvents(evs);
  }, [lectures]);

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