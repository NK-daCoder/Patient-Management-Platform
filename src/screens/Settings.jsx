import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { placeholderImage } from '../constants/icons';

const Settings = ({ theme, setTheme }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [privacyEnabled, setPrivacyEnabled] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("preferred_language");
    if (storedLang) setLanguage(storedLang);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    document.documentElement.classList.toggle("light", selectedTheme === "light");
  };

  return (
    <Section 
        theme={theme}
        className="space-y-6"
    >
      <h1 className={`${theme !== "light" ? "text-white" :"text-stone-500"} text-xl font-semibold tracking-tight`}>⚙️ Settings</h1>

      {/* Profile */}
      <div className={`${theme !== "light" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-stone-300"} shadow-md rounded-xl p-5 border-t `}>
        <h2 className={`${theme !== "light" ? "text-stone-300" : "text-neutral-700"} text-md font-medium`}>👤 Profile</h2>
        <div className="flex items-center gap-4 mt-3">
          <div className="relative">
            <img
              src={profileImage || placeholderImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover shadow-md border border-neutral-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload profile picture"
            />
          </div>
          <div>
            <p className={`${theme !== "light" ? "text-stone-400" : "text-neutral-800"} text-sm"`}>Name: <span className={`${theme !== "light" ? "text-stone-400" : "text-neutral-500"} text-sm"`}>Nehemiah</span></p>
            <p className={`${theme !== "light" ? "text-stone-400" : "text-neutral-800"} text-sm"`}>Email: <span className={`${theme !== "light" ? "text-stone-400" : "text-neutral-500"} text-sm"`}>nehemiah@example.com</span></p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={`${theme !== "light" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-stone-300"} shadow-md rounded-xl p-5 border-t `}>
        <h2 className={`${theme !== "light" ? "text-stone-300" : "text-neutral-700"} text-md font-medium`}>🔔 Notifications</h2>
        <div className="flex items-center justify-between mt-3">
          <span className="text-stone-400 text-sm">Receive Reminders</span>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              notificationsEnabled ? 'bg-green-500' : 'bg-stone-700'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform ${
                notificationsEnabled ? 'translate-x-6' : ''
              } transition-transform`}
            />
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <div className={`${theme !== "light" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-stone-300"} shadow-md rounded-xl p-5 border-t `}>
        <h2 className={`${theme !== "light" ? "text-stone-300" : "text-neutral-700"} text-md font-medium`}>🌗 Theme</h2>
        <div className="flex gap-4 mt-3">
          {["light", "dark"].map((option) => (
            <button
              key={option}
              onClick={() => handleThemeChange(option)}
              className={`px-4 py-2 rounded-full text-sm ${
                theme === option
                  ? "bg-green-600 text-white border-t border-green-500 shadow-md shadow-green-600/50"
                  : "bg-stone-800 text-stone-400 hover:bg-stone-700 border-t border-stone-500 shadow-md"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Privacy Toggle */}
      <div className={`${theme !== "light" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-stone-300"} shadow-md rounded-xl p-5 border-t `}>
        <h2 className={`${theme !== "light" ? "text-stone-300" : "text-neutral-700"} text-md font-medium`}>🔒 Privacy</h2>
        <div className="flex items-center justify-between mt-3">
          <span className="text-stone-400 text-sm">Share profile with doctors</span>
          <button
            onClick={() => setPrivacyEnabled(!privacyEnabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              privacyEnabled ? 'bg-green-500' : 'bg-stone-700'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transform ${
                privacyEnabled ? 'translate-x-6' : ''
              } transition-transform`}
            />
          </button>
        </div>
      </div>

      {/* Language Preference */}
      <div className={`${theme !== "light" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-stone-300"} shadow-md rounded-xl p-5 border-t `}>
        <h2 className={`${theme !== "light" ? "text-stone-300" : "text-neutral-700"} text-md font-medium`}>🌍 Language</h2>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            localStorage.setItem("preferred_language", e.target.value);
          }}
          className={`${theme !== "light" ? "bg-stone-800 text-white" : "bg-neutral-300 text-stone-800"}  px-4 py-3 rounded-xl text-sm w-full mt-3`}
        >
          <option>English</option>
          <option>Zulu</option>
          <option>Xhosa</option>
          <option>Sesotho</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

      {/* Danger Zone */}
      <div className={`${theme !== "light" ? "bg-neutral-900 border-neutral-800" : "bg-neutral-200 border-stone-300"} shadow-md rounded-xl p-5 border-t `}>
        <h2 className={`${theme !== "light" ? "text-stone-300" : "text-neutral-700"} text-md font-medium`}>🔓 Danger Zone</h2>
        <button
          onClick={() => {
            localStorage.clear();
            alert("🔁 Data cleared. You'll be logged out.");
            window.location.reload();
          }}
          className="bg-red-600 border-t border-red-300 shadow-lg shadow-red-500/25 hover:bg-red-500 text-white px-4 py-2 mt-4 rounded-full text-sm"
        >
          Clear All Data & Logout
        </button>
      </div>
    </Section>
  );
};

export { Settings };
