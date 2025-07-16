
import useSWR from 'swr';
import type { User } from '../types/user';
import { fetcher } from '../lib/api';

export const useUser = () => {
  // SWRは第一引数のキー（ここでは'/api/users/me'）を使ってリクエストをキャッシュする
  const { data, error, isLoading, mutate } = useSWR<User>('/api/users/me', fetcher);

  const isNameRegistered = data ? data.name !== null : false;
  const displayName = data ? data.name || data.university_email.split('@')[0] : 'Guest';

  return {
    user: data,
    isLoading,
    isError: error,
    isNameRegistered,
    displayName,
    mutate, // キャッシュを手動で更新するための関数
  };
};
