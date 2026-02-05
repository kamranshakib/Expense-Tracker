import React from 'react'
import CustomPieChart from '../Chart/CustomPieChart';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]; // اصلاح: #875C5 → #875CF5

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
const balanceData = [
    {name:"Total Balance", amount: totalBalance}, // اصلاح: Balalnce → Balance
    {name:"Total Income", amount: totalIncome},
    {name:"Total Expense", amount: totalExpense},
];
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>
        <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview