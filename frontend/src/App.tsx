import { useUser } from './hooks/useUser';
import { ProfileModal } from './components/ProfileModal';
import { Calendar } from './components/Calendar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupplementaryLectureDetail } from './components/SupplementaryLectureDetail';
import { SupplementaryLectureForm } from './components/SupplementaryLectureForm';
import { LectureRequestRanking } from './components/LectureRequestRanking';
import { OfficialLectureList } from './components/OfficialLectureList';
import { AdminPage } from './components/AdminPage';

function App() {
  const { user, isLoading, isError, isAccessDenied, displayName } = useUser();

  const handleLogin = () => {
    // 保護されたAPIエンドポイントにアクセスすることで、IAPの認証フローを開始させる
    // この場合、ページをリロードすることでSWRが再検証をトリガーする
    window.location.reload();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAccessDenied) {
    return <div>あなたのアカウントはこのサービスを利用する権限がありません。</div>;
  }
  if (isError) {
    return (
      <div>
        <p>データの読み込みに失敗しました。</p>
        <button onClick={handleLogin}>再度ログインを試す</button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ProfileModal />
      <div className={user && !user.name ? 'content-blurred' : ''}>
        <header>
          <h1>EbiYobi Calendar</h1>
          <p>ようこそ, {displayName} さん</p>
        </header>
        <div style={{ display: 'flex' }}> {/* Flexboxでレイアウトを調整 */}
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/lectures/:id" element={<SupplementaryLectureDetail />} />
              <Route path="/lectures/new" element={<SupplementaryLectureForm />} />
              <Route path="/official-lectures" element={<OfficialLectureList />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <aside style={{ width: '250px', padding: '1rem', borderLeft: '1px solid #eee' }}> {/* サイドパネル */}
            <LectureRequestRanking />
          </aside>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;