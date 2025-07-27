
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
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
      // 成功すれば、user.nameが更新されるため、このモーダルは自動的に閉じる
      mutate(updatedUserData, false);
    } catch (err) {
      setError('更新に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ユーザー情報がロード中、または名前が登録済みの場合はモーダルを非表示
  const isOpen = !user?.name;

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-bold">
            ようこそ！
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-500">
            他のユーザーに表示される名前を入力してください。
          </Dialog.Description>
          
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 山田 太郎"
                disabled={isSubmitting}
                className="w-full rounded border p-2"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? '登録中...' : '登録する'}
            </button>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
