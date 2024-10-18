import { useState, useEffect } from "react";
import React from "react";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import axios from "axios";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateNewTask = ({ setExpand, setActiveTab }) => {
  setActiveTab("contentManagement");
  const head = "Create New Task";
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };

 

    fetchUsers();
  
  }, []);
  const handleLogout = () => {
    try {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } catch (error) {
    }
  };
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const token = localStorage.getItem('jwt'); 
    function isTokenExpired(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
  }
  
    if (isTokenExpired(token)) {
      alert('Session expired. Please log in again.');
      handleLogout();
      return;
  }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/task",
        { userId, name: title },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        console.log(response.data.task);
        setTasks(response.data.task)
        
      ;

        setTitle(""); 
        setUserId("");
      }
    } catch (err) {
      setError("Failed to create task");
    }
  };

  const columns = [
    {
      header: "User",
      accessor: "assignedTo", 
    },
    {
      header: "Task Title",
      accessor: "name",
    },
    {
      header: "Status",
      accessor: "status",
    },
  ];

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>
      <div className="ml-80 mt-20 relative" style={{ marginTop: "140px" }}>
      <div className="ml-72 mb-8 relative bg-[#EEEEEE] p-9 rounded-md drop-shadow-md border" style={{ marginTop: "120px" }}>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Add a New Task</h2>
          
          {error && <div className="text-red-500 mb-2">{error}</div>}

          <div className="mb-4">
            <label className="block text-gray-700">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Assign to User</label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="border rounded p-2 w-full"
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">
            Add Task
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTask;
