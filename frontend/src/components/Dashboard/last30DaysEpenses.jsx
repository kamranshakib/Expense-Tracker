import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../Utils/helper';
import CustomBarChart from '../Chart/CustomBarChart';

const Last30DaysEpenses = ({data}) => { // تغییر: حرف اول بزرگ

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const result = prepareExpenseBarChartData(data);
            setChartData(result);
        } else {
            setChartData([]); // در صورت نبود داده، آرایه خالی تنظیم شود
        }
        return () => {};

    }, [data])

  return (
    <div className='card col-span-1'>
        <div className=' flex items-center justify-between'>
            <h5 className='text-lg'> Last 30 Days Expenses</h5>
        </div>
        {chartData && chartData.length > 0 ? (
            <CustomBarChart data={chartData} />
        ) : (
            <div className='flex items-center justify-center h-64'>
                <p className='text-gray-500'>No data available for the last 30 days</p>
            </div>
        )}
    </div>
  )
}

export default Last30DaysEpenses; 