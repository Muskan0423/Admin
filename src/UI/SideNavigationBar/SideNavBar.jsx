import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import defaultLogoSrc from '../Logo.avif' 

function SideNavBar({ expand, setExpand, activeTab, setActiveTab }) {
  const activeMenu = true;
  const [subMenu, setSubMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setSubMenu(!subMenu);
  };
  const [value, setValue] = useState(0);
    const [Hdata, setHdata] = useState([]);
    const [Idata, setIdata] = useState("");
 

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
    }
  };
  

  return (
    <div
      className="w-72 h-screen fixed "
      style={{ backgroundColor: "#EEEEEE", width: "17.3rem" }}>
      <div className=" hello ml-3 h-screen overflow-auto pb-10 scrollbar-hide">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
            <Link href="/" >
            {Idata ? (
        <img src={Idata} alt="TSS"  className="max-w-[70%] h-auto max-h-[150px] mx-auto my-auto flex ml-8 mt-2" />
      ) : (
        <img src={defaultLogoSrc} alt="Default Logo"   className=" max-w-[90%]  my-auto h-auto max-h-[180px] flex ml-2 mt-2" />
      )}
                          
        </Link>
            </div>

            <div className="mt-10 font-semibold" style={{ marginLeft: "4px" }}>
              MENU
            </div>
            {/* Dashboard */}
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "dashboard" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "dashboard" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("dashboard");
                  setExpand("dashboard");
                }}>
                <SpeedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Dashboard</span>
              </NavLink>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "settings" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "settings" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/addMember"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("Blogs");
                  setExpand("Blogs");
                }}>
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Add Users</span>
              </NavLink>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "settings" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "settings" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/addNewTask"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("Blogs");
                  setExpand("Blogs");
                }}>
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Add task</span>
              </NavLink>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "settings" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "settings" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/ticket"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("settings");
                  setExpand("settings");
                }}>
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Ticket Management</span>
              </NavLink>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "settings" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "settings" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/settings"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("settings");
                  setExpand("settings");
                }}>
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">Task Management</span>
              </NavLink>
            </div>
            <div className="mt-4 text-gray-500 text-xs">
              <NavLink
                style={{
                  color: activeTab === "settings" ? "#c93a0e" : "#545e6f",
                  fontWeight: activeTab === "settings" ? "bold" : "inherit",
                }}
                activeclassname="active"
                to="/home/Blogs"
                className="flex items-center"
                onClick={() => {
                  setActiveTab("Blogs");
                  setExpand("Blogs");
                }}>
                <SettingsOutlinedIcon style={{ transform: "scale(0.65)" }} />
                <span className="pl-1">User Management</span>
              </NavLink>
            </div>
           


            <div className="mt-10 flex justify-center">
              <button onClick={handleLogout}>
                <img src="/images/logout.png" alt="logout" srcSet="" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SideNavBar;
