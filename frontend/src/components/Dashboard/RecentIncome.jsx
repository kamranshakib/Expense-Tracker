import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { data } from 'react-router-dom'

const RecentIncome = ({transactions,OnSeeMore}) => {
  return (
    <div className='card'>
        <div className=' flex items-center justify-between'>
                <h5 className='text-lg'>Income</h5>

            <button className='card-btn' onClick={OnSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((item) => (
                <TransactionInfoCard
                key={item._id}
                title={item.source}
                icon={item.icon}
                date={moment(item,data).format("DO MMM YYY")}
                amount={item.amount}
                type="income"
                hideDeleteBtn />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome
