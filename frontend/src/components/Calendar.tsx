import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Calendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      events={`${API_BASE_URL}/api/events`}
      eventColor="#3788d8" // デフォルトのイベント色
      // TODO: イベントの種類に応じて色を変えるためのeventClassNamesプロパティなどを後で追加
      // TODO: イベントクリック時の処理をeventClickプロパティで後で追加
    />
  );
};
