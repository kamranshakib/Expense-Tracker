  import React from 'react'
  import CustomPieChart from '../Chart/CustomPieChart';
  import { addThousandsSeparatore } from '../../Utils/helper';

  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

  const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
      // ✅ محاسبه totalBalance اگر صفر بود
      const calculatedTotalBalance = totalBalance || (totalIncome - totalExpense);
      
      const balanceData = [
          {name: "Total Balance", amount: calculatedTotalBalance || 0},
          {name: "Total Income", amount: totalIncome || 0},
          {name: "Total Expense", amount: totalExpense || 0},
      ];
      
      return (
          <div className='card'>
              <div className='flex items-center justify-between'>
                  <h5 className='text-lg'>Financial Overview</h5>
              </div>
              <CustomPieChart
                  data={balanceData}
                  label="Total Balance"
                  totalAmount={`${addThousandsSeparatore(calculatedTotalBalance || 0)}`} // ✅ اضافه کردن فرمت‌کننده
                  colors={COLORS}
                  showTextAnchor
              />
          </div>
      )
  }

  export default FinanceOverview