// src/components/EmojiPickerPopup.jsx
import React, { useState } from "react";
import { LuX } from "react-icons/lu"; // ایکون برای بستن پاپاپ
import EmojiPicker from "emoji-picker-react"; // حتماً نصب کنید: npm i emoji-picker-react

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emojiData) => {
    onSelect(emojiData.emoji); // ارسال ایموجی به فرم
    setIsOpen(false); 
  };

  return (
    <div className="relative flex flex-col">
      {/* دکمه باز کردن پاپاپ */}
      <button
        type="button"
        className="text-2xl border rounded p-2 w-12 h-12 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon || "💰"}
      </button>

      {/* پاپاپ */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border rounded shadow-lg">
          <div className="flex justify-end p-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <LuX size={18} />
            </button>
          </div>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
