import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavigationBar/SideNavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
} from "react-router-dom";
import CMSBlog from "../Pages/Content_Management/AllPages/pages/CMSBlog";
import Configuration from "../Pages/Configuration_Screen/Configuration";
import Dashboard from "../Pages/DashBoard_Screen/Dashboard";
import UserDetails from "../Pages/User_Management/All_Users/all_user";
import CMSAddMember from "../Pages/Content_Management/AllPages/Depts/CMSAddMember";
import CreateNewPage from "../Pages/Content_Management/CreateNewPage/createNewPage";
function Home() {
  const [expand, setExpand] = useState("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const togleExpand = (menu) => {
    setExpand(menu);
  };

  return (
    <div className="flex">
      <NavLink to="/" id="fail"></NavLink>
      {localStorage.getItem("jwt") && (
        <>
          <SideNavBar
            expand={expand}
            setExpand={togleExpand}
            activeTab={activeTab}
            setActiveTab={handleActiveTab}
          />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route
              exact
              path="/blogs"
              element={
                <CMSBlog
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/addMember"
              element={
                <CMSAddMember
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />{" "}
            <Route
              exact
              path="/settings"
              element={
                <Configuration
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
              <Route
              exact
              path="/AddnewTask"
              element={
                <CreateNewPage
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
            <Route
              exact
              path="/allUsers"
              element={
                <UserDetails
                  setExpand={togleExpand}
                  setActiveTab={handleActiveTab}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default Home;
