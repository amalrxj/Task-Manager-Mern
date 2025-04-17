import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "High":
        return "#FF1F57"; // Red for High priority
      case "Medium":
        return "#FE9900"; // Orange for Medium priority
      case "Low":
        return "#00BC7D"; // Green for Low priority
      default:
        return "#00BC7D"; // Default color
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded-lg shadow-md">
          <p className="text-xs font-semibold text-purple-800 mb-1">{`Priority: ${payload[0].payload.priority}`}</p>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="text-sm font-medium text-gray-900">
              {payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "transparent" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar
            dataKey="count"
            name="Priority Count"
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
