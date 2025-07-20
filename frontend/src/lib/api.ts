
import type { User } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Google IAPを介したリクエストでは、通常ブラウザが自動で認証情報をハンドリングするため、
// fetchのオプションに特別なヘッダーを追加する必要はありません。
// ただし、withCredentialsをtrueに設定することが推奨される場合があります。
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    credentials: 'omit', // IAPでは通常不要だが、将来的な認証方式の変更に備える
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // エラーレスポンスから詳細な情報を取得してエラーオブジェクトに添付
    try {
      error.info = await res.json();
    } catch (e) {
      // JSONパースに失敗した場合
      error.info = { message: await res.text() };
    }
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// ユーザー情報を更新するAPI関数
export const updateUser = async (name: string): Promise<User> => {
  const res = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    // エラーハンドリング
    throw new Error('Failed to update user');
  }

  return res.json();
};

// 出席登録API
export const attendLecture = async (lectureId: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/supplementary-lectures/${lectureId}/attendees`, {
    method: 'POST',
  });
};

// 出席キャンセルAPI
export const cancelAttendance = async (lectureId: number): Promise<void> => {
  await fetch(`${API_BASE_URL}/api/supplementary-lectures/${lectureId}/attendees`, {
    method: 'DELETE',
  });
};
