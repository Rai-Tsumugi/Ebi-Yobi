import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/api';
import type { OfficialLecture } from '../types/officialLecture';
import { RequestButton } from './RequestButton';

export const OfficialLectureList = () => {
  const { data: officialLectures, error, isLoading } = useSWR<OfficialLecture[]>('/api/official-lectures', fetcher);

  if (isLoading) return <div>公式講義を読み込み中...</div>;
  if (error) return <div>公式講義の読み込みに失敗しました。</div>;
  if (!officialLectures || officialLectures.length === 0) return <div>公式講義が見つかりません。</div>;

  return (
    <div className="official-lecture-list">
      <h2>公式講義一覧</h2>
      <ul>
        {officialLectures.map(lecture => (
          <li key={lecture.id} style={{ marginBottom: '1rem', border: '1px solid #eee', padding: '1rem' }}>
            <h3>{lecture.name} ({lecture.professor})</h3>
            <p>曜日: {lecture.dayOfWeek}, 時限: {lecture.period}</p>
            <RequestButton lecture={lecture} />
          </li>
        ))}
      </ul>
    </div>
  );
};
