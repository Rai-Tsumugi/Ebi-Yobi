import React, { useState } from 'react';
import Classes from './classes/classes.jsx';
import Schedule from './schedule/scheduls.jsx';

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 6 : d.getDay() - 1;
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

const getStartOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

function Main({ activeTab }) {
  // 週/月の選択状態を親で管理
  const [view, setView] = useState('week');
  // currentWeekを共通で管理
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));
  const [currentMonth, setCurrentMonth] = useState(getStartOfMonth(new Date()));

  switch (activeTab) {
    case '授業':
      return (
        <div id="classes">
          <Classes
            view={view}
            setView={setView}
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
      );
    case 'Myスケジュール':
      return (
        <div id="myschedule">
          <Schedule
            view={view}
            setView={setView}
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
      );
    case '授業登録':
      return <div id="register">新しい授業を登録するフォーム</div>;
    case 'ログアウト':
      return <div id="logout">ログアウトします…👋</div>;
    default:
      return <div>未選択</div>;
  }
}

export default Main;
