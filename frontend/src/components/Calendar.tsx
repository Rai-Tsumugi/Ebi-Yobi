import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom'; // インポートを追加

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Calendar = () => {
  const navigate = useNavigate(); // useNavigateフックを使用

  const handleEventClick = (clickInfo: any) => {
    // 私的補講イベントの場合のみ詳細ページに遷移
    if (clickInfo.event.extendedProps.type === 'supplementary') {
      navigate(`/lectures/${clickInfo.event.id.replace('sup-', '')}`);
    }
    // TODO: 個人予定の場合は編集モーダルを表示するロジックを後で追加
  };

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
      eventClick={handleEventClick} // eventClickハンドラを追加
      // TODO: イベントの種類に応じて色を変えるためのeventClassNamesプロパティなどを後で追加
    />
  );
};
