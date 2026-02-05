import React from 'react'
import { LuArrowBigRight } from 'react-icons/lu'
import moment from "moment"
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransactions = ({transactions, OnSeeMore}) => { // اصلاح نام
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className='card-btn' onClick={OnSeeMore}>
                See All <LuArrowBigRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0, 5)?.map((item) => ( // اصلاح: (0.5) → (0, 5)
                <TransactionInfoCard
                    key={item._id}
                    title={item.type === 'expense' ? item.category : item.source} // اصلاح: == → ===
                    icon={item.icon}
                    date={moment(item.date).format("Do MMM YYYY")} // اصلاح: Do MMM YYY → Do MMM YYYY
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn // اصلاح: hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions // اصلاح نام