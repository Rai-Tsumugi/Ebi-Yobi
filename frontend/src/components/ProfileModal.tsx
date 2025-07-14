
import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';
import { updateUser } from '../lib/api';

export const ProfileModal = () => {
  const { user, mutate } = useUser();
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('表示名を入力してください。');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      const updatedUserData = await updateUser(name);
      // SWRのキャッシュを更新してUIに即時反映させる
      mutate(updatedUserData, false); // falseは再検証を抑制するオプション
    } catch (err) {
      setError('更新に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ユーザー情報がロード中、または名前が登録済みの場合は何も表示しない
  if (!user || user.name) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>ようこそ！</h2>
        <p>他のユーザーに表示される名前を入力してください。</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 山田 太郎"
            disabled={isSubmitting}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '登録中...' : '登録する'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};
