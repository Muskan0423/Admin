import React, { useState, useEffect } from "react";
import TopHeader from "../../UI/TopHeader/TopHeader";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";
import { Grid } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../User_Management/features/userSlice";

const Configuration = ({ setActiveTab }) => {
  const [tasks, setTasks] = useState({ pending: [], fulfilled: [] });
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  
  const apiUrl = 'http://localhost:5000';
  
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

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditedTaskName(task.name);
  };

  const handleEditChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleEditSubmit = async (taskId) => {
    try {
      await axios.put(`${apiUrl}/api/admin/task/${taskId}`, { name: editedTaskName }, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
      });
      setTasks((prevTasks) => ({
        ...prevTasks,
        pending: prevTasks.pending.map((task) => 
          task._id === taskId ? { ...task, name: editedTaskName } : task
        ),
      }));
      setEditingTaskId(null);
      setEditedTaskName('');
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskName('');
  };

  const head = "Task Management";

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid height="80" width="80" color="#4fa94d" ariaLabel="grid-loading" radius="12.5" visible={true} />
        </div>
      )}
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-72 mt-32 w-full relative">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Pending Tasks</h2>
          {tasks.pending.length > 0 ? (
            tasks.pending.map((task) => (
              <div key={task._id} className="p-4 border-b flex justify-between items-center">
                {editingTaskId === task._id ? (
                  <>
                    <input 
                      type="text" 
                      value={editedTaskName} 
                      onChange={handleEditChange} 
                      className="border p-1" 
                    />
                    <div>
                      <button onClick={() => handleEditSubmit(task._id)} className="bg-blue-500 text-white p-1 mr-2">Save</button>
                      <button onClick={handleCancelEdit} className="bg-gray-500 text-white p-1">Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p>{task.name}</p>
                    <button onClick={() => handleEditClick(task)} className="bg-yellow-500 text-white p-1">Edit</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No pending tasks.</p>
          )}

          <h2 className="text-2xl font-semibold mt-6 mb-4">Fulfilled Tasks</h2>
          {tasks.fulfilled.length > 0 ? (
            tasks.fulfilled.map((task) => (
              <div key={task._id} className="p-4 border-b flex justify-between items-center">
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
