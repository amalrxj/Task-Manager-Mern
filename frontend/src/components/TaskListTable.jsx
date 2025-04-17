import React from "react";
import moment from "moment";

const TaskListTable = ({ tableData }) => {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-purple-100 text-purple-500 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-500 border border-cyan-200";
      case "Completed":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-500 border border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-500 border border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-500 border border-green-200";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-200";
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-gray-800 font-medium text-sm ">
              Name
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-sm">
              Status
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-sm">
              Priority
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-sm hidden md:table-cell">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr
              key={task._id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="my-3 mx-4 text-gray-700 text-sm line-clamp-1 overflow-hidden">
                {task.title}
              </td>
              <td className="py-3 px-4 ">
                <span
                  className={`inline-block px-2 py-1 text-xs ${getStatusBadgeColor(
                    task.status
                  )} rounded-full`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`inline-block px-2 py-1 text-xs ${getPriorityBadgeColor(
                    task.priority
                  )} rounded-full`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-700 text-sm text-nowrap hidden md:table-cell">
                {task.createdAt
                  ? moment(task.createdAt).format("Do MMM YYYY")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
