import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../Utils/helper';
import CustomBarChart from '../Chart/CustomBarChart';

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
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days Expenses</h5>
      </div>

      {chartData.length > 0 ? (
        <div className="mt-6 h-[300px]">
          <CustomBarChart data={chartData} />
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
