import { useUser } from './hooks/useUser';
import { ProfileModal } from './components/ProfileModal';
import { Calendar } from './components/Calendar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SupplementaryLectureDetail } from './components/SupplementaryLectureDetail';
import { SupplementaryLectureForm } from './components/SupplementaryLectureForm';

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
        <main>
          <Routes> 
            <Route path="/" element={<Calendar />} /> 
            <Route path="/lectures/:id" element={<SupplementaryLectureDetail />} /> 
            <Route path="/lectures/new" element={<SupplementaryLectureForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;