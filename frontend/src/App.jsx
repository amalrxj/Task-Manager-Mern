import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
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
import UserProvider from "./context/userContext";
import { UserContext } from "./context/userContextInstance";

import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
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
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route
                path="/user/task-details/:id"
                element={<ViewTaskDetails />}
              />
            </Route>
            {/* Default route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>

      {/* <ToastContainer /> */}
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "bottom-right",
          reverseOrder: false,
          style: {
            fontSize: "13px",
            backgroundColor: "#EFF6FF", // Soft blue background
            color: "#1D4ED8", // HeroUI primary blue text
            border: "1px solid #BFDBFE", // Light blue border
            borderRadius: "0.5rem", // 8px border radius
            boxShadow: "none", // No shadow (flat look)
            padding: "0.75rem 1rem", // Comfortable spacing
          },
          iconTheme: {
            primary: "#1D4ED8", // HeroUI primary blue
            secondary: "#EFF6FF" , // Soft secondary color
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
