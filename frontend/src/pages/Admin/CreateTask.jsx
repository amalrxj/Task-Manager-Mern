/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {};

  const updateTask = async () => {};

  const handleSubmit = async () => {};

  const getTaskDetailsByID = async () => {}

  const deleteTask = async () => {};



  return <DashboardLayout activeMenu="Create Task">
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <h2 className="">
              {taskId ? "Update Task" : "Create Task"}
            </h2>
            {taskId && (
              <button
                className=""
                onClick={() => setOpenDeleteAlert(true)}
              >
                <LuTrash2 className=""/> Delete Task
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  </DashboardLayout>;
};

export default CreateTask;
