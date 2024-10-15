import React, { useState, useEffect } from "react";
import TopHeader from "../../UI/TopHeader/TopHeader";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";
import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../User_Management/features/userSlice";
// import { tssurl } from "../../UI/port";

const Configuration = ({ setActiveTab }) => {
  const [tasks, setTasks] = useState({ pending: [], fulfilled: [] });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);

  const apiUrl = 'http://localhost:3001';
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')));
  }, [dispatch]);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/api/admin/tasks`, {
          headers: {
            "authorization": `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        console.log(response.data);
        
        setTasks({ pending: response.data.pending, fulfilled: response.data.fulfilled });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  setActiveTab("settings");

  const head = "Task Management";

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid height="80" width="80" color="#4fa94d" ariaLabel="grid-loading" radius="12.5" visible={true} />
        </div>
      ) : null}
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-72 mt-32 w-full relative">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Pending Tasks</h2>
          {tasks.pending.length > 0 ? (
            tasks.pending.map((task) => (
              <div key={task._id} className="p-4 border-b">
                <p>{task.name}</p>
              </div>
            ))
          ) : (
            <p>No pending tasks.</p>
          )}

          <h2 className="text-2xl font-semibold mt-6 mb-4">Fulfilled Tasks</h2>
          {tasks.fulfilled.length > 0 ? (
            tasks.fulfilled.map((task) => (
              <div key={task._id} className="p-4 border-b">
                <p>{task.name}</p>
              </div>
            ))
          ) : (
            <p>No fulfilled tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuration;
