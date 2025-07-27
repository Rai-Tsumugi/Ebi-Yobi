import { useUser } from './hooks/useUser';
import { ProfileModal } from './components/ProfileModal';
import { Calendar } from './components/Calendar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupplementaryLectureDetail } from './components/SupplementaryLectureDetail';
import { SupplementaryLectureForm } from './components/SupplementaryLectureForm';
import { LectureRequestRanking } from './components/LectureRequestRanking';
import { OfficialLectureList } from './components/OfficialLectureList'; // インポートを追加

function App() {
  const { user, isLoading, isError, displayName } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
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
              <Route path="/official-lectures" element={<OfficialLectureList />} /> {/* この行を追加 */}
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