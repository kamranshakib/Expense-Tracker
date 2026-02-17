// components/Income/AddIncomeFrom.jsx
import React, { useState } from "react";
import EmojiPickerPopup from "../components/EmojiPickerPopup"; // مسیر به EmojiPickerPopup
import toast from "react-hot-toast";

const AddIncomeFrom = ({ onAddIncome }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState(""); // اینجا ایموجی ذخیره می‌شود

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!source.trim()) {
      toast.error("Source is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    // ارسال داده به والد
    onAddIncome({
      source: source.trim(),
      amount: Number(amount),
      date,
      icon: icon || "💰", // اگر ایموجی انتخاب نشده بود، 💰 پیش‌فرض
    });

    // پاک کردن فرم بعد از ارسال
    setSource("");
    setAmount("");
    setDate("");
    setIcon("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* انتخاب ایموجی */}
      <EmojiPickerPopup icon={icon} onSelect={setIcon} />

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Source</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border rounded px-3 py-2 mt-1"
          placeholder="Income source"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded px-3 py-2 mt-1"
          placeholder="Amount"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-2 mt-1"
        />
      </div>

      {/* نمایش ایموجی انتخاب شده */}
      {icon && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-2xl">{icon}</span>
          <span className="text-gray-600">Selected Icon</span>
        </div>
      )}

      <button
        type="submit"
        className="mt-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800"
      >
        Add Income
      </button>
    </form>
  );
};

export default AddIncomeFrom;
