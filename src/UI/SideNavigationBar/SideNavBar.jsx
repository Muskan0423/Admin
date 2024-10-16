import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SpeedIcon from "@mui/icons-material/Speed";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import AssessmentIcon from '@mui/icons-material/Assessment';
import axios from "axios";
import cookie from "js-cookie";
import { HelpCenterOutlined, LocalShippingOutlined, SupportAgentOutlined } from "@mui/icons-material";
import { useEffect } from 'react';
import {tssurl} from '../port.js';
import defaultLogoSrc from '../Logo.avif' 

function SideNavBar({ expand, setExpand, activeTab, setActiveTab }) {
  const activeMenu = true;
  const [subMenu, setSubMenu] = useState(false);
  // console.log(activeTab);
  const navigate = useNavigate();

  const handleMenu = () => {
    setSubMenu(!subMenu);
  };
  const [value, setValue] = useState(0);
    const [Hdata, setHdata] = useState([]);
    const [Idata, setIdata] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
              const response = await axios({
                method: "get",
                url: `${tssurl}/pages/header`,
                headers: {
                  "authorization": `${localStorage.getItem('jwt')}`,
                  // "Access-Control-Allow-Origin": "*",
                  "Content-Type": "application/json",
                  "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
              });
              setIdata(response?.data?.headerr?.brand_logo?.url)
              // console.log(response?.data?.headerr?.brand_logo?.url,"sa,mple");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData(); // Call the renamed function
    }, [])
    
    useEffect(() => {
        // // console.log(Hdata);
    }, [Hdata])

  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/");
      window.location.reload();
      // console.log("Logged Out sucessfully");
    } catch (error) {
      // console.log(error);
      // console.log("Not submitting data");
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
