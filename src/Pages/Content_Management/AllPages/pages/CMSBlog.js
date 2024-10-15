import React, { useState, useEffect } from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { Grid } from "react-loader-spinner";
import Table from "../../../../UI/CommonTable/Table";
import axios from 'axios';
import defaultProfile from '../../../../UI/CommonTable/Assets/profile.jpg'; 
import SignupModal from './SignupModal'; 
import { Button } from "@mui/material";

const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img 
        className="w-12 h-12 rounded-md" 
        style={{ objectFit: 'cover' }} 
        src={picUrl || defaultProfile} 
        alt="Profile" 
      />
    </div>
  );
};

const CMSUsers = ({ setActiveTab, setExpand }) => {
  setExpand("userManagement");
  setActiveTab("users");
  const head = "Users";
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [signupOpen, setSignupOpen] = useState(false); // State for modal

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/users/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const data = userData.map((user) => ({
    profilePhoto: <ProfilePhoto picUrl={user.profilePhoto} />, // Pass user's profile picture URL
    username: user.username,
    tasks: user.tasks.map(task => task.name).join(", ") || "No tasks", // Join task names
  }));

  const columns = [
    {
      header: "Profile Photo",
      accessor: "profilePhoto",
    },
    {
      header: "Username",
      accessor: "username",
    },
    {
      header: "Tasks",
      accessor: "tasks",
    },
  ];

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            visible={true}
          />
        </div>
      )}

      <div>
        <TopHeader className="fixed" head={head} />
      
      </div>
      <Button onClick={() => setSignupOpen(true)}>Add User</Button>
      <div className="ml-72 w-[75vw] relative" style={{ marginTop: "70px" }}>
        {data.length > 0 ? (
          <Table columns={columns} data={data} />
        ) : (
          <div className="flex ml-5 justify-center w-full mt-40">
            <h2 className="text-4xl font-bold text-gray-500">No Users Found!</h2>
          </div>
        )}
      </div>

      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} /> {/* Render SignupModal */}
    </div>
  );
};

export default CMSUsers;
