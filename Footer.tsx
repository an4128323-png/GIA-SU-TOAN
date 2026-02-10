import React from 'react';

interface FooterProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Nhà' },
    { id: 'learn', icon: '📘', label: 'Sách' },
    { id: 'chat', icon: '😺', label: 'Mèo AI' },
    { id: 'profile', icon: '👤', label: 'Tôi' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#0e1428] flex justify-around p-2 shadow-lg">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`flex flex-col items-center justify-center p-2 text-xs font-medium ${
            activeTab === item.id ? 'text-[#6f5cff]' : 'text-[#9aa4bf]'
          } focus:outline-none`}
        >
          <span className="text-xl leading-none mb-1">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </footer>
  );
};

export default Footer;