import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CustomBarChart = ({ data, xDataKey = "month" }) => {
  const getBarColor = (index) => index % 2 === 0 ? "#87fcf5" : "#cfbefb";

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
          <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload[xDataKey]}</p>
          <p className='text-sm text-gray-600'>
            Amount: <span className='text-sm font-medium text-gray-900'>${payload[0].payload.amount}</span>
          </p>
          {payload[0].payload.change !== undefined && (
            <p className='text-xs text-gray-500'>
              Change: {payload[0].payload.change >= 0 ? "+" : ""}{payload[0].payload.change}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    // والد div برای کنترل proportional
    <div className="w-full" style={{ height: '250px', maxHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke='none' />
          <XAxis dataKey={xDataKey} tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;