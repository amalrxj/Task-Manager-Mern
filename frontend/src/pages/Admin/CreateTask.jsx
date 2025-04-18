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
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: {},
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
      dueDate: {},
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {};

  const updateTask = async () => {};

  const handleSubmit = async () => {};

  const getTaskDetailsByID = async () => {};

  const deleteTask = async () => {};

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-red-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete Task
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Create App UI"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            <div className="mt-3">
              <label htmlFor="" className="form-label">
                Description
              </label>
              <textarea
                className="form-input"
                rows={4}
                value={taskData.description}
                placeholder="Describe Task"
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              ></textarea>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-3">
              <div className="col-span-6 md:col-span-4">
                <label className="form-label">Priority</label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className="form-label">Due Date</label>
                <input
                  placeholder="Select Due Date"
                  type="date"
                  className="form-input"
                  value={taskData.dueDate ? moment(taskData.dueDate).format("YYYY-MM-DD") : ""}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="form-label">Assigned To</label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
