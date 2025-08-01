import React from 'react';
import { useSWRConfig } from 'swr';
import { requestLecture, cancelLectureRequest } from '../lib/api';
import type { OfficialLecture } from '../types/officialLecture';

interface RequestButtonProps {
  lecture: OfficialLecture;
}

export const RequestButton = ({ lecture }: RequestButtonProps) => {
  const { mutate } = useSWRConfig();

  const handleRequest = async () => {
    // 楽観的UI更新
    mutate(
      '/api/official-lectures', // 更新対象のSWRキー
      (currentData: OfficialLecture[] | undefined) => {
        // キャッシュデータをイミュータブルに更新
        return currentData?.map(l => 
          l.id === lecture.id ? { ...l, isRequested: true, requestCount: (l.requestCount || 0) + 1 } : l
        );
      },
      false // APIへの再検証は行わない
    );
    // APIリクエスト
    await requestLecture(lecture.id);
    // 完了後、最新のデータでキャッシュを再検証
    mutate('/api/official-lectures');
  };

  const handleCancel = async () => {
    // 楽観的UI更新
    mutate(
      '/api/official-lectures',
      (currentData: OfficialLecture[] | undefined) => {
        return currentData?.map(l => 
          l.id === lecture.id ? { ...l, isRequested: false, requestCount: Math.max(0, (l.requestCount || 1) - 1) } : l
        );
      },
      false
    );
    // APIリクエスト
    await cancelLectureRequest(lecture.id);
    // 完了後、最新のデータでキャッシュを再検証
    mutate('/api/official-lectures');
  };

  return (
    <div>
      {lecture.isRequested ? (
        <button onClick={handleCancel}>希望を取り消す</button>
      ) : (
        <button onClick={handleRequest}>補講を希望する</button>
      )}
      <span>現在の希望者数: {lecture.requestCount || 0}人</span>
    </div>
  );
};
