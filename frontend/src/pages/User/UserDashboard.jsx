import React, { useState, useEffect, useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContextInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Prepare data for pie chart
  const preparePieChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.In_Progress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const priorityLevelsData = [
      { priority: "High", count: taskPriorityLevels?.High || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
    ];

    setBarChartData(priorityLevelsData);
  };

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );

      if (response.data) {
        setDashboardData(response.data);
        preparePieChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data.");
    }
  };

  const onSeeMore = () => {
    navigate("/user/tasks");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (

    

    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="cols-span-3">
            <h2 className="text-xl text-black md:text-2xl">
              {getGreeting()} {user?.name}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.In_Progress || 0
            )}
            color="bg-cyan-500"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card ">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Task Distribution</h5>
            </div>
            { dashboardData?.charts?.taskDistribution?.All > 0 ? (
              <CustomPieChart data={pieChartData} colors={COLORS} />
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No task distribution data available.
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Task Priority Levels</h5>
            </div>
            { dashboardData?.charts?.taskDistribution?.All > 0 ? (
              <CustomBarChart data={barChartData} colors={COLORS} />
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No task distribution data available.
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold text-gray-800">
                Recent Tasks
              </h5>
              <button className="card-btn" onClick={onSeeMore}>
                See More <LuArrowRight className="text-base" />
              </button>
            </div>

            {/* <TaskListTable tableData={dashboardData?.recentTasks || []} /> */}
            {dashboardData?.recentTasks &&
            dashboardData.recentTasks.length > 0 ? (
              <TaskListTable tableData={dashboardData.recentTasks} />
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No recent tasks found.
              </p>
            )}
          </div>
        </div>
      </div>
      {error && (
      <div className="text-red-500 shadow-lg my-5">
        <div>
          <span>{error}</span>
        </div>
      </div>
    )}
    </DashboardLayout>
  );
};

export default UserDashboard;
