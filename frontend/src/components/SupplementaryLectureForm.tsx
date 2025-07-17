import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { fetcher } from '../lib/api';
import type { OfficialLecture } from '../types/officialLecture';
import useSWR from 'swr'; // useSWRのインポートをここに移動

// フォームデータの型定義
interface SupplementaryLectureFormData {
  officialLectureId: number;
  location: string;
  startTime: Date;
  endTime: Date;
  description?: string;
}

export const SupplementaryLectureForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<SupplementaryLectureFormData>();
  const navigate = useNavigate();

  // 公式講義リストの取得
  const { data: officialLectures, error: officialLecturesError } = useSWR<OfficialLecture[]>('/api/official-lectures', fetcher);

  const [startDate, endDate] = watch(['startTime', 'endTime']); // DatePickerの制御用

  useEffect(() => {
    register('startTime', { required: '開始時間は必須です' });
    register('endTime', { required: '終了時間は必須です' });
  }, [register]);

  const onSubmit = async (data: SupplementaryLectureFormData) => {
    try {
      // 日時をISO文字列に変換して送信
      const payload = {
        ...data,
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
      };
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/supplementary-lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to create supplementary lecture');
      }

      navigate('/'); // 登録成功後、カレンダーページへリダイレクト
    } catch (error) {
      console.error('Error creating supplementary lecture:', error);
      alert('補講の登録に失敗しました。');
    }
  };

  if (officialLecturesError) return <div>公式講義の読み込みに失敗しました。</div>;
  if (!officialLectures) return <div>公式講義を読み込み中...</div>;

  return (
    <div className="supplementary-lecture-form">
      <h2>私的補講 登録</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>関連講義:</label>
          <select {...register('officialLectureId', { required: '関連講義は必須です' })}> 
            <option value="">選択してください</option>
            {officialLectures?.map(lecture => (
              <option key={lecture.id} value={lecture.id}>
                {lecture.name} ({lecture.professor})
              </option>
            ))}
          </select>
          {errors.officialLectureId && <p className="error-message">{errors.officialLectureId.message}</p>}
        </div>

        <div>
          <label>場所:</label>
          <input type="text" {...register('location', { required: '場所は必須です' })} />
          {errors.location && <p className="error-message">{errors.location.message}</p>}
        </div>

        <div>
          <label>開始日時:</label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setValue('startTime', date)}
            showTimeSelect
            dateFormat="yyyy/MM/dd HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            placeholderText="開始日時を選択"
          />
          {errors.startTime && <p className="error-message">{errors.startTime.message}</p>}
        </div>

        <div>
          <label>終了日時:</label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setValue('endTime', date)}
            showTimeSelect
            dateFormat="yyyy/MM/dd HH:mm"
            timeFormat="HH:mm"
            timeIntervals={15}
            placeholderText="終了日時を選択"
            minDate={startDate} // 開始日時より前の日付は選択不可
          />
          {errors.endTime && <p className="error-message">{errors.endTime.message}</p>}
        </div>

        <div>
          <label>内容 (任意):</label>
          <textarea {...register('description')} />
        </div>

        <button type="submit">登録</button>
      </form>
    </div>
  );
};
