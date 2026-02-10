import React, { useState, useEffect } from 'react';

const ProfileTab: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>(() => localStorage.getItem('userName') || ''); // Initialize from localStorage
  const [profileMessage, setProfileMessage] = useState<string>('');

  useEffect(() => {
    // Load avatar from localStorage if saved previously
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  const loadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setAvatarUrl(url);
        localStorage.setItem('userAvatar', url); // Save avatar URL to localStorage
        setProfileMessage('');
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    localStorage.setItem('userName', name); // Save name to localStorage
    setProfileMessage(name ? `✔ Đã lưu tên: ${name}` : '✔ Đã lưu');
  };

  return (
    <div className="mt-[70px] bg-[#141c2f] rounded-2xl p-4 shadow-lg flex flex-col items-center"> {/* Adjust margin-top to clear fixed header */}
      <h3 className="text-xl font-bold mb-4">👤 Cá nhân</h3>

      <div
        className="w-24 h-24 rounded-full bg-[#1f2a4a] flex items-center justify-center text-4xl mb-4 overflow-hidden"
        style={avatarUrl ? { backgroundImage: `url(${avatarUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        aria-label="User avatar"
      >
        {!avatarUrl && '🐱'}
      </div>

      <label htmlFor="avatar-upload" className="cursor-pointer bg-[#1f2a4a] text-white py-2 px-4 rounded-xl font-semibold hover:bg-[#2a375a] transition duration-200 mb-4">
        Chọn ảnh đại diện
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={loadAvatar}
          className="hidden"
          aria-label="Upload avatar image"
        />
      </label>

      <input
        id="nameInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập tên của bạn"
        className="w-full p-3 border-none rounded-xl mt-1 bg-[#0f1630] text-[#eef1ff] placeholder-[#9aa4bf] focus:outline-none focus:ring-2 focus:ring-[#6f5cff] mb-4"
        aria-label="User name input"
      />

      <button
        onClick={saveProfile}
        className="bg-[#6f5cff] text-white py-2 px-4 rounded-xl font-semibold hover:bg-[#8b6cff] transition duration-200"
      >
        Lưu thông tin
      </button>

      {profileMessage && <p className="mt-4 text-green-400 text-sm">{profileMessage}</p>}
    </div>
  );
};

export default ProfileTab;