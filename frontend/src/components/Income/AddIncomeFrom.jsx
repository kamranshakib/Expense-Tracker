import React, { useState } from 'react'
import Input from "../Inputs/Input.jsx"
import EmojiPickerPopup from '../../components/EmojiPickerPopup.jsx';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon: "💰",
    });

    const handleChange = (key, value) =>
        setIncome({ ...income, [key]: value });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!income.source || !income.amount || !income.date) {
            alert("Please fill all fields");
            return;
        }

        onAddIncome({
            ...income,
            _id: Date.now(),        // ✅ مهم — اصلاح شد
            amount: Number(income.amount) // ✅ حتماً عدد باشد
        });

        setIncome({
            source: "",
            amount: "",
            date: "",
            icon: "💰",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) =>
                    handleChange("icon", selectedIcon)
                }
            />

            <Input
                value={income.source}
                onChange={({ target }) =>
                    handleChange("source", target.value)
                }
                label="Income Source"
                placeholder='Freelance, Salary, etc'
                type='text'
            />

            <Input
                value={income.amount}
                onChange={({ target }) =>
                    handleChange("amount", target.value)
                }
                label="Amount"
                placeholder='0'
                type='number'
                min="0"
            />

            <Input
                value={income.date}
                onChange={({ target }) =>
                    handleChange("date", target.value)
                }
                label="Date"
                type='date'
                max={new Date().toISOString().split('T')[0]}
            />

            <div className='flex justify-end mt-6'>
                <button
                    className='add-btn add-btn-fill'
                    type='submit'
                >
                    Add Income
                </button>
            </div>
        </form>
    )
}

export default AddIncomeForm;
