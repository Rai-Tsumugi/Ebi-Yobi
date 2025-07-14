import { useUser } from './hooks/useUser';
import { ProfileModal } from './components/ProfileModal';
import './App.css'; // モーダル用のCSSを追記する必要がある

function App() {
  const { user, isLoading, isError, displayName } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <>
      <ProfileModal />
      
      {/* メインコンテンツ */}
      <div className={user && !user.name ? 'content-blurred' : ''}>
        <header>
          <h1>EbiYobi Calendar</h1>
          <p>ようこそ, {displayName} さん</p>
        </header>
        {/* ここにカレンダーなどのメインコンポーネントが配置される */}
      </div>
    </>
  );
}

export default App;