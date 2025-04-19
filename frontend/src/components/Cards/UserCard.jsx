import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt={`Avatar`}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-3 mt-5">
        <StateCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StateCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StateCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StateCard = ({ label, count, status }) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-gray-50 text-cyan-500";
      case "Completed":
        return "bg-gray-50 text-indigo-500";
      default:
        return "bg-gray-50 text-violet-500";
    }
  };

  return (
    <div
      className={`flex-1 text-xs font-medium  ${getStatusTagColor()} px-4 py-2 rounded-sm shadow-xs`}
    >
      <span className="text-sm font-semibold">{count}</span> <br /> {label}
    </div>
  );
};
