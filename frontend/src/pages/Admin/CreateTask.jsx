/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
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

  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist.map((item) => ({
        text: item,
        completed: false,
      }));

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      toast.success("Task created successfully!");
      clearData();
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Failed to create task. Please try again."
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const prevTodoChecklist = currentTask?.todoChecklist || [];

      const todolist = taskData.todoChecklist?.map((item) => {
        const matchedTask = prevTodoChecklist.find(
          (task) => task.text === item
        );

        return {
          text: item,
          completed: matchedTask?.completed || false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: taskData.dueDate
          ? new Date(taskData.dueDate).toISOString()
          : null,
        todoChecklist: todolist,
      });

      toast.success("Task updated successfully!");
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Update Task Error:", error?.response || error);
      setError(
        error?.response?.data?.message ||
          "Failed to update task. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    setError(null);

    if (!taskData.title.trim()) {
      setError("Please enter task title.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Please enter task description.");
      return;
    }
    if (!taskData.dueDate || taskData.dueDate === "") {
      setError("Please select task due date.");
      return;
    }
    if (taskData.assignedTo.length === 0) {
      setError("Please select at least one user.");
      return;
    }
    if (taskData.todoChecklist.length === 0) {
      setError("Please add at least one todo item.");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id || []),
          todoChecklist:
            taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);

      toast.success("Task deleted successfully!");
      navigate("/admin/tasks");
    } catch (error) {
      setError("Failed to delete task. Please try again.");
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID(taskId);
    }
  }, [taskId]);

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
                  value={taskData?.priority}
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
                  value={taskData.dueDate || ""}
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

            <div className="mt-3">
              <label className="form-label">Todo Checklist</label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>

            <div className="mt-3">
              <label className="form-label">Add Attachments</label>
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-4">{error}</p>
            )}

            <div className="flex justify-end mt-3">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)}>
        <DeleteAlert
          content="Are you sure want to delete the task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default CreateTask;
