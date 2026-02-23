import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome, onClose }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "💰"
    });

    const handleChange = (key, value) => setIncome({...income, [key]: value});

    const handleSubmit = () => {
        onAddIncome({
            source: income.source,
            amount: income.amount,
            date: income.date,
            icon: income.icon || "💰"
        });
    };

    return (
        <div className="space-y-4">
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            
            <Input
                value={income.source}
                onChange={({ target }) => handleChange("source", target.value)}
                label="Source"
                placeholder="Salary, Freelance, etc"
                type="text"
                required
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="0.00"
                type="number"
                min="0"
                step=""
                required
            />
            
            <Input
                value={income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                type="date"
            />

            <div className='flex justify-end mt-6 gap-2'>
                <button
                    className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors'
                    type='button'
                    onClick={onClose}
                >
                    Cancel
                </button>
                
                <button
                    className='px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-purple-600 rounded-lg hover:bg-purple-700 transition-colors'
                    type='button'
                    onClick={handleSubmit}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;