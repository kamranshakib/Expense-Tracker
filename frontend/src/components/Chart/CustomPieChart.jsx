import React from 'react'
import CustomLegend from './CustomLegend'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"

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
    showTextAnchor = false,
    label = "",
    totalAmount = 0
}) => {
    const isMobile = window.innerWidth < 640; // موبایل

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={isMobile ? 110 : 130}  // کمی بزرگ‌تر روی موبایل
                    innerRadius={isMobile ? 80 : 100}   // کمی بزرگ‌تر روی موبایل
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>

                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="24px"
                            fontWeight="600"
                        >
                            ${Number(totalAmount).toLocaleString()}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart;