import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContextInstance";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const [validImage, setValidImage] = useState(null);

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

  useEffect(() => {
    if (!user?.profileImageUrl) return;
    const img = new Image();
    img.src = user.profileImageUrl;
    img.onload = () => setValidImage(user.profileImageUrl);
    img.onerror = () => setValidImage("https://i.imgur.com/QdvjMxC.png");
  }, [user?.profileImageUrl]);

  return (
    <div className="w-64 h-[calc(100vh - 61px)] bg-white border-r border-gray-200/50 sticky z-20">
      <div className="flex flex-col items-center justify-center pt-5 mb-7">
        <div className="relative">
          <img
            src={validImage || "https://i.imgur.com/QdvjMxC.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover bg-slate-200"
          />
        </div>
        {user?.role === "admin" && (
          <div className="mt-2 inline-flex items-center gap-1 rounded border border-primary/50 bg-white px-2 py-0.5 text-[10px] font-medium text-primary">
            <FaCrown className="w-2.5 h-2.5" />
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
