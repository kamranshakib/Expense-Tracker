import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from "moment"
import TransactionInfoCard from "../Cards/TransactionInfoCard" 

const ExpenseTransactions = ({transactions, onSeeMore}) => { // اصلاح: trasactions → transactions
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expenses</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((expense) => ( // اصلاح: trasactions → transactions
                <TransactionInfoCard
                key={expense._id}
                title={expense.category} // اصلاح: catagory → category
                icon={expense.icon}
                date={moment(expense.date).format("Do MMM YYYY")} // اصلاح: DO → Do و YYY → YYYY
                amount={expense.amount}
                type="expense"
                hideDeleteBtn /> // اصلاح: hidDeleteBtn → hideDeleteBtn
            ))}
        </div>
    </div>
  );
};

export default ExpenseTransactions