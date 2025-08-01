import React, { useState } from 'react';
import { useUser } from '../hooks/useUser';

export const AdminPage = () => {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setUploadMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('ファイルを選択してください。');
      return;
    }

    setIsUploading(true);
    setUploadMessage('アップロード中...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/import-lectures`, {
        method: 'POST',
        // 'Content-Type'はブラウザが自動で設定するため、手動で設定しない
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'アップロードに失敗しました。');
      }

      setUploadMessage(data.message);
    } catch (error) {
      setUploadMessage(`エラー: ${(error as Error).message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // 管理者でない場合は何も表示しない
  if (user?.role !== 'ADMIN') {
    return (
      <div>
        <h2>管理者専用ページ</h2>
        <p>このページを閲覧する権限がありません。</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h2>管理者向けCSV一括インポート</h2>
      <p>大学公式の講義データをCSVファイルで一括登録します。</p>
      <p><strong>注意:</strong> この操作は既存の全公式講義データを上書きします。</p>
      
      <div className="csv-format-info">
        <h4>CSVフォーマット</h4>
        <p>CSVファイルは以下のヘッダーを持つ必要があります:</p>
        <code>name, professor, dayOfWeek, period, termId</code>
      </div>

      <div className="upload-form">
        <input type="file" accept=".csv" onChange={handleFileChange} disabled={isUploading} />
        <button onClick={handleUpload} disabled={isUploading || !selectedFile}>
          {isUploading ? '処理中...' : 'インポート実行'}
        </button>
      </div>

      {uploadMessage && <div className="upload-feedback">{uploadMessage}</div>}
    </div>
  );
};
