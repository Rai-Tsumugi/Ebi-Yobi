import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import { PersonalEventModal } from './PersonalEventModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Calendar = () => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleEventClick = (clickInfo) => {
    const type = clickInfo.event.extendedProps.type;
    if (type === 'supplementary') {
      navigate(`/lectures/${clickInfo.event.id.replace('sup-', '')}`);
    } else if (type === 'personal') {
      setSelectedEvent(clickInfo.event);
      setIsModalOpen(true);
    }
  };

  const handleSelect = (selectInfo) => {
    setSelectedEvent(null); // 編集モードではないことを明示
    setSelectedDateRange({
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedDateRange(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={`${API_BASE_URL}/api/events`}
        eventClick={handleEventClick}
        selectable={true}
        select={handleSelect}
        eventClassNames={(arg) => {
          // イベントの種類に応じてクラス名を返す
          if (arg.event.extendedProps.type === 'official') {
            return ['event-official'];
          }
          if (arg.event.extendedProps.type === 'supplementary') {
            return ['event-supplementary'];
          }
          if (arg.event.extendedProps.type === 'personal') {
            return ['event-personal'];
          }
          return [];
        }}
      />
      <PersonalEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={selectedEvent}
        dateRange={selectedDateRange}
        onSuccess={handleSuccess}
      />
    </>
  );
};
