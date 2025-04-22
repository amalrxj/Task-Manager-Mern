import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length && payload[0]) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
        <p className="text-xs font-semibold text-purple-800 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600">
          Count :{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
