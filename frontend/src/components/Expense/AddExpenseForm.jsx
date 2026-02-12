import React, { useState } from 'react';
import Input from "../Inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense, onClose }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: ""
    });

    const handleChange = (key, value) => setExpense({...expense, [key]: value});

    const handleSubmit = () => {
        onAddExpense({
            catagory: expense.category,
            amount: expense.amount,
            date: expense.date,
            icon: expense.icon
        });
    };

    return (
        <div className="space-y-4">
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            
            <Input
                value={expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label="Category"
                placeholder="Rent, Groceries, etc"
                type="text"
                required
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="0.00"
                type="number"
                min="0"
                step=""
                required
            />
            
            <Input
                value={expense.date}
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
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;