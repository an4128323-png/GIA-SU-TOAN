import React, { useState, useEffect } from 'react';

interface HomeTabProps {
  onTabChange: (tabId: string) => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onTabChange }) => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="mt-[70px] p-4 flex justify-center items-center h-[calc(100vh-160px)]"> {/* Adjust margin-top, center content, and use full height */}
      <div className="bg-gradient-to-br from-[#6f5cff] to-[#8b6cff] rounded-3xl p-8 shadow-2xl text-center max-w-sm w-full transform transition-transform duration-300 hover:scale-105">
        <div className="text-6xl mb-4 animate-bounce-slow" aria-label="A cute cat emoji"> {/* Added a subtle bounce animation for cuteness */}
          😻
        </div>
        <h2 className="m-0 text-3xl font-extrabold mb-2 leading-tight">
          Chào {userName || 'bạn mới'}! ✨
        </h2>
        <p className="my-2 text-lg text-gray-100">Học Toán 8 cùng Mèo nhé!</p>
        <div className="flex flex-col gap-4 mt-6"> {/* Changed to flex-col for better mobile stacking */}
          <button
            onClick={() => onTabChange('learn')}
            className="w-full bg-white text-[#6f5cff] py-3 px-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition duration-200 shadow-md"
          >
            Học bài
          </button>
          <button
            onClick={() => onTabChange('chat')}
            className="w-full bg-[#1f2a4a] text-white py-3 px-4 rounded-xl font-bold text-lg hover:bg-[#2a375a] transition duration-200 shadow-md"
          >
            Hỏi Mèo AI
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HomeTab;