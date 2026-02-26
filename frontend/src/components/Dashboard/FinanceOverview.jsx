import React from 'react'
import CustomPieChart from '../Chart/CustomPieChart';
import { addThousandsSeparatore } from '../../Utils/helper';

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const income = Number(totalIncome) || 0;
    const expense = Number(totalExpense) || 0;
    const balance = Number(totalBalance) || 0;
    
    let calculatedTotalBalance = balance;
    if (!calculatedTotalBalance && (income || expense)) {
        calculatedTotalBalance = income - expense;
    }
    
    const finalBalance = isNaN(calculatedTotalBalance) ? 0 : calculatedTotalBalance;
    const balanceData = [
        { name: "Total Balance", amount: balance },
        { name: "Total Income", amount: income },
        { name: "Total Expense", amount: expense },
    ];
    
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>
            </div>

            <div className='w-full  mx-auto mt-2.5' style={{ height: '230px', minHeight: '230px' }}>
                <CustomPieChart
                    data={balanceData}
                    label="Total Balance"
                    totalAmount={addThousandsSeparatore(finalBalance)}
                    colors={COLORS}
                    showTextAnchor
                />
            </div>
        </div> 
    )
}

export default FinanceOverview;