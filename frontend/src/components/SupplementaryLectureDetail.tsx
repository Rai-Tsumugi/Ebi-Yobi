import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../lib/api';
import type { User } from '../types/user'; // User型をインポート

// 私的補講のAPIレスポンスの型定義
interface SupplementaryLectureDetailData {
  id: number;
  officialLectureName: string;
  location: string;
  startTime: string; // ISO 8601形式
  endTime: string;   // ISO 8601形式
  description: string | null;
  creator: {
    id: string;
    name: string | null;
  };
  attendeeCount: number;
  // isAttending?: boolean; // 後で追加
}

export const SupplementaryLectureDetail = () => {
  const { id } = useParams<{ id: string }>(); // URLからIDを取得

  // SWRでAPIからデータを取得
  const { data, error, isLoading } = useSWR<SupplementaryLectureDetailData>(
    id ? `/api/supplementary-lectures/${id}` : null,
    fetcher
  );

  if (isLoading) return <div>Loading supplementary lecture details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;
  if (!data) return <div>No details found.</div>;

  // 日付のフォーマット
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // ローカルタイムゾーンで表示
  };

  return (
    <div className="supplementary-lecture-detail">
      <h2>{data.officialLectureName} 補講</h2>
      <p><strong>場所:</strong> {data.location}</p>
      <p><strong>日時:</strong> {formatDateTime(data.startTime)} - {formatDateTime(data.endTime)}</p>
      {data.description && <p><strong>内容:</strong> {data.description}</p>}
      <p><strong>開催者:</strong> {data.creator.name || data.creator.id}</p>
      <p><strong>現在の出席者数:</strong> {data.attendeeCount}名</p>
      {/* TODO: 出席登録/キャンセルボタンを後で追加 */}
    </div>
  );
};
