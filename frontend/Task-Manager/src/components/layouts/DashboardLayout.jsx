import React, { useContext } from "react";
import { UserContext } from "../../context/userContextInstance";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({activeMenu, children }) => {
  const { user } = useContext(UserContext);
  return (
    <div >
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">
          {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
