import React from 'react';

interface HeaderProps {
  level: number;
}

const Header: React.FC<HeaderProps> = ({ level }) => {
  return (
    <header className="bg-[#0e1428] p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-md">
      <div>
        <h1 className="m-0 text-lg">🐱 Mèo Toán 8</h1>
        <small className="text-[#9aa4bf] text-xs">Gia sư AI</small>
      </div>
      <div className="text-[#eef1ff] text-sm">LV {level}</div>
    </header>
  );
};

export default Header;