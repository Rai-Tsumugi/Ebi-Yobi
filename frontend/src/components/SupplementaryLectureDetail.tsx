import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, attendLecture, cancelAttendance } from '../lib/api';
import type { User } from '../types/user';
import { useUser } from '../hooks/useUser';

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
  isAttending: boolean; // isAttendingプロパティを追加
}

export const SupplementaryLectureDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user: loginUser } = useUser(); // ログインユーザー情報を取得

  // SWRのキーを動的に設定
  const swrKey = id ? `/api/supplementary-lectures/${id}` : null;
  const { data, error, isLoading, mutate } = useSWR<SupplementaryLectureDetailData>(swrKey, fetcher);

  const handleAttend = async () => {
    if (!data) return;

    console.log('--- ID Check ---');
    console.log('Login User ID:', loginUser?.id);
    console.log('Creator ID:', data.creator.id);
    console.log('Is Creator?:', loginUser?.id === data.creator.id);
    console.log('----------------');

    // 楽観的UI更新: UIを即座に変更
    mutate({ ...data, isAttending: true, attendeeCount: data.attendeeCount + 1 }, false);

    try {
      await attendLecture(data.id);
      // サーバーからの最新情報で再検証
      mutate();
    } catch (err) {
      // エラーが発生したらUIを元に戻す
      mutate({ ...data, isAttending: false, attendeeCount: data.attendeeCount }, false);
      alert('出席登録に失敗しました。');
    }
  };

  const handleCancel = async () => {
    if (!data) return;

    console.log('--- ID Check ---');
    console.log('Login User ID:', loginUser?.id);
    console.log('Creator ID:', data.creator.id);
    console.log('Is Creator?:', loginUser?.id === data.creator.id);
    console.log('----------------');

    // 楽観的UI更新: UIを即座に変更
    mutate({ ...data, isAttending: false, attendeeCount: data.attendeeCount - 1 }, false);

    try {
      await cancelAttendance(data.id);
      // サーバーからの最新情報で再検証
      mutate();
    } catch (err) {
      // エラーが発生したらUIを元に戻す
      mutate({ ...data, isAttending: true, attendeeCount: data.attendeeCount }, false);
      alert('出席のキャンセルに失敗しました。');
    }
  };

  if (isLoading) return <div>Loading supplementary lecture details...</div>;
  if (error) return <div>Error loading details: {error.message}</div>;
  if (!data) return <div>No details found.</div>;

  // 日付のフォーマット
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // ローカルタイムゾーンで表示
  };

  // 開催者は出席ボタンを表示しない
  const isCreator = loginUser?.id === data.creator.id;

  return (
    <div className="supplementary-lecture-detail">
      <h2>{data.officialLectureName} 補講</h2>
      <p><strong>場所:</strong> {data.location}</p>
      <p><strong>日時:</strong> {formatDateTime(data.startTime)} - {formatDateTime(data.endTime)}</p>
      {data.description && <p><strong>内容:</strong> {data.description}</p>}
      <p><strong>開催者:</strong> {data.creator.name || data.creator.id}</p>
      <p><strong>現在の出席者数:</strong> {data.attendeeCount}名</p>

      {!isCreator && (
        <div>
          {data.isAttending ? (
            <button onClick={handleCancel}>出席をキャンセルする</button>
          ) : (
            <button onClick={handleAttend}>出席する</button>
          )}
        </div>
      )}
    </div>
  );
};
