import React, { useEffect, useState } from 'react';
import CustomBarChart from '../Chart/CustomBarChart';
import { prepareExpenseBarChartData } from '../../Utils/helper';

const Last30DaysEpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const result = prepareExpenseBarChartData(data);
            setChartData(result || []);
        } else {
            setChartData([]);
        }
    }, [data]);

    return (
        <div className='card col-span-1 bg-white p-6 rounded-2xl shadow-md border border-gray-200/50'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg font-semibold text-gray-800'>Last 30 Days Expenses</h5>
            </div>

            {chartData.length > 0 ? (
                <div className="mt-6 h-[300px]">
                    {/* کلید xDataKey باید با prepareExpenseBarChartData هماهنگ باشد */}
                    <CustomBarChart data={chartData} xDataKey="catagory" />
                </div>
            ) : (
                <div className='flex items-center justify-center h-64'>
                    <p className='text-gray-500'>
                        No data available for the last 30 days
                    </p>
                </div>
            )}
        </div>
    );
};

export default Last30DaysEpenses;
