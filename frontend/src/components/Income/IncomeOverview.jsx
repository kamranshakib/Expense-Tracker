import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Chart/CustomBarChart';
import { prepareIncomeBarChartData } from '../../Utils/helper';
import { setChartData } from 'recharts/types/state/chartDataSlice';

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([])


    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result)

        return () => { };
    }, [transactions]);

    return (
        <div>
        <div className='card'>
            <div className='flex items-center justify-between'>

                <h5 className='text-lg'>Income OverView</h5>
                <p className='text-xs  text-gray-400 mt-0.5'>
                    Track your earning over time and analyze your income trends.
                </p>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg' />
            </button>
        </div>
        <div className='mt-10'>
            <CustomBarChart data={chartData} />
        </div>

        </div>

    )
}

export default IncomeOverview
