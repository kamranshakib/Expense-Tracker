import React from 'react'
import { LuArrowBigRight } from 'react-icons/lu'
import moment from "moment"
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransactions = ({ transactions, OnSeeMore }) => {
  console.log("RecentTransactions received:", transactions);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>
        <button className='card-btn' onClick={OnSeeMore}>
          See All <LuArrowBigRight className='text-base'/>
        </button>
      </div>

      <div className='mt-6'>
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === 'expense' ? item.category : item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No recent transactions found
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentTransactions
