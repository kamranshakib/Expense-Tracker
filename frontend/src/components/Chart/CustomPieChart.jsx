import React from 'react'
import CustomLegend from './CustomLegend'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Label,
} from "recharts"

// تعریف CustomTooltip که وجود نداشت
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border rounded shadow-lg">
                <p className="font-semibold">{payload[0].name}</p>
                <p className="text-gray-600">
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

const CustomPieChart = ({
    data = [],
    colors = [],
    showTextAnchor = false, // مقدار پیش‌فرض اضافه شد
    label = "", // مقدار پیش‌فرض اضافه شد
    totalAmount = 0 // مقدار پیش‌فرض اضافه شد
}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} /> {/* اصلاح شد */}
                <Legend content={<CustomLegend />} /> {/* اصلاح شد */}

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill='#666'
                            fontSize="14px"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill='#333'
                            fontSize="24px"
                            fontWeight="semi-bold"
                        >
                            ${totalAmount.toLocaleString()}
                        </text>

                    </>
                )}


            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart