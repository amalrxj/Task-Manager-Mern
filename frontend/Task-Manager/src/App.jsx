import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import CreateTask from "./pages/Admin/CreateTask";
import ManageTasks from "./pages/Admin/ManageTasks";

import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";

import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-tasks" element={<CreateTask />} />
          </Route>

          {/* User Routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tasks" element={<MyTasks />} />
          <Route path="/user/tasks-details/:id" element={<ViewTaskDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
