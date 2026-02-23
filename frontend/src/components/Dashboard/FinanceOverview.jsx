import React from 'react'
import CustomPieChart from '../Chart/CustomPieChart';
import { addThousandsSeparatore } from '../../Utils/helper';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    // تبدیل مقادیر به عدد برای جلوگیری از NaN
    const income = Number(totalIncome) || 0;
    const expense = Number(totalExpense) || 0;
    const balance = Number(totalBalance) || 0;
    
    // محاسبه مقدار نهایی با اطمینان از عدد بودن
    let calculatedTotalBalance = balance;
    if (!calculatedTotalBalance && (income || expense)) {
        calculatedTotalBalance = income - expense;
    }
    console.log(calculatedTotalBalance)

    
    // اطمینان از اینکه مقدار نهایی حتماً عدد است
    const finalBalance = isNaN(calculatedTotalBalance) ? 0 : calculatedTotalBalance;
    const balanceData = [
        {name: "Total Balance", amount: balance},
        {name: "Total Income", amount: income},
        {name: "Total Expense", amount: expense},
    ];
    
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={addThousandsSeparatore(finalBalance)}
                colors={COLORS}
                showTextAnchor
            />
        </div> 
    )
}

export default FinanceOverview;