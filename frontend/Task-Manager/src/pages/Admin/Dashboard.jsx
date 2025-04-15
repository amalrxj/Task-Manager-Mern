import React, { useState, useEffect, useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContextInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data.");
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  useEffect(() => {
    getDashboardData();
  }, [user]);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="cols-span-3">
            <h2 className="text-xl text-black md:text-2xl">
              {getGreeting()} {user?.name}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5 ">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
