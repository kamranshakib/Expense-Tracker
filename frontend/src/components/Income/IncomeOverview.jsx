import React, { useEffect, useState } from 'react'
import CustomBarChart from '../Chart/CustomBarChart'
import { prepareIncomeBarChartData } from '../../Utils/helper'
import { setChartData as rechartsSetChartData } from 'recharts/types/state/chartDataSlice'
import { LuPlus } from 'react-icons/lu'

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions)
    setChartData(result)

    return () => {}
  }, [transactions])

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Income OverView</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Track your earning over time and analyze your income trends.
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>

      {/* ✅ دقیقاً مثل Expense */}
      <div className='mt-10 h-[300px]'>
        <CustomBarChart data={chartData} />
      </div>
    </div>
  )
}

export default IncomeOverview
