import React, { useState } from 'react';
import Navigation from './navigation';
import './header.css';

function Header({ activeTab, onChangeTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // タブクリック時にメニューも閉じる
  const handleChangeTab = (tab) => {
    onChangeTab(tab);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="site-logo">エビ予備</div>
        <input
          type="checkbox"
          id="nav-check"
          className="nav-check"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <label htmlFor="nav-check" className="menu-toggle" aria-label="メニューを開く">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <Navigation activeTab={activeTab} onChangeTab={handleChangeTab} />
      </div>
    </header>
  );
}

export default Header;
