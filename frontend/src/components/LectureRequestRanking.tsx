import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/api';
import type { LectureRequestRanking as RankingData } from '../types/lectureRequest';

export const LectureRequestRanking = () => {
  const { data: ranking, error } = useSWR<RankingData[]>('/api/lecture-requests/ranking', fetcher, {
    refreshInterval: 60000, // 60秒ごとに自動更新
  });

  if (error) return <div>ランキングの読み込みに失敗しました。</div>;
  if (!ranking) return <div>ランキングを読み込み中...</div>;

  return (
    <div className="lecture-request-ranking">
      <h3>補講希望ランキング</h3>
      <ol>
        {ranking.map((item, index) => (
          <li key={item.officialLectureId}>
            <span>{index + 1}.</span>
            <div>
              <p>{item.lectureName} ({item.professor})</p>
              <p>{item.requestCount}人が希望中</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
