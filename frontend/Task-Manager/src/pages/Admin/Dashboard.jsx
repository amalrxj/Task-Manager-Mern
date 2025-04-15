import React, { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  return (
    <div>
      
      Admin Dashboard
      <h1>Welcome, {user.name}</h1>
    </div>
  );
};

export default Dashboard;
