import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContextInstance";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh - 61px)] bg-white border-r border-gray-200/50 sticky z-20">
      <div className="flex flex-col items-center justify-center pt-5 mb-7">
        <div className="relative">
          <img
            src={user?.profileImageUrl || "https://i.imgur.com/QdvjMxC.png"}
            alt="Profile Image"
            className="w-20 h-20 bg-slate-200 rounded-full object-contain"
          />
        </div>
        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-primary bg-white px-3 py-0.5 rounded mt-2 border border-primary/50 outline-none">
            Admin
          </div>
        )}
        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500">{user?.email || ""}</p>
      </div>
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-3 text-[15px] ${
            activeMenu == item.label
              ? "text-primary bg-linear-to-r from-blue-50/40 to-blue-100/50 border-r-4"
              : ""
          } py-3.5 px-6 mb-2 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
