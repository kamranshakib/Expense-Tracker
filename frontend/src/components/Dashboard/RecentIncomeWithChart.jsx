import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Chart/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"]

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {

        const preparedData = Array.isArray(data)
            ? data.map((item) => ({
                name: item?.source || "Unknown",
                amount: Number(item?.amount) || 0,
            }))
            : []

        setChartData(preparedData)

    }, [data])

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={Number(totalIncome) || 0}
                showTextAnchor={true}
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart
