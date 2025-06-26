import React from 'react';
import './navigation.css';
const tabs = ['授業', 'Myスケジュール', '授業登録', 'ログアウト'];

function Navigation({ activeTab, onChangeTab }) {
  return (
    <nav className="site-nav">
      <ul>
        {tabs.map(tab => (
          <li key={tab}>
            <button
              type="button" // ← 追加
              className={tab === activeTab ? 'is-active' : ''}
              onClick={() => onChangeTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
