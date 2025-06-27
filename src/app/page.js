'use client';

import { useState } from 'react';
import Header from '../components/header/header.jsx';
import Main from '../components/main/content.jsx';

export default function Home() {
  const [activeTab, setActiveTab] = useState('授業');

  return (
    <>
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />
      <Main activeTab={activeTab} />
    </>
  );
}