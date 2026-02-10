import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeTab from './components/HomeTab';
import LearnTab from './components/LearnTab';
import ChatTab from './components/ChatTab';
import ProfileTab from './components/ProfileTab';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userLevel, setUserLevel] = useState<number>(1); // Example state for user level

  return (
    <div className="min-h-screen bg-[#0b1220] text-[#eef1ff] flex flex-col">
      <Header level={userLevel} />

      <main className="flex-grow container px-4 pb-[90px] mx-auto max-w-lg">
        {activeTab === 'home' && <HomeTab onTabChange={setActiveTab} />}
        {activeTab === 'learn' && <LearnTab />}
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>

      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;