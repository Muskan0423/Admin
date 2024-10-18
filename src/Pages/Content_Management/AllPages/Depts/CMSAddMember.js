import { useState } from "react";
import React from "react";
import TopHeader from "../../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { CAlert } from '@coreui/react'; 


const CMSAddMember = ({ setExpand, setActiveTab }) => {
  setExpand("contentManagement");
  setActiveTab("department");
  const head = "Add User";
  const Navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');     
  const [password, setPassword] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', data);
      <CAlert color="success">
 {response.data.message}
</CAlert>
    
      Navigate('/');
    } catch (error) {
      <CAlert color="danger">
{error.response?.data?.message || "An error occurred"}
</CAlert>
    
    }
  };

  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-72 mb-8 relative bg-[#EEEEEE] p-9 rounded-md drop-shadow-md border" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit}>
          <label className="grid mt-5">
            Member Name
            <input
              type="text"
              placeholder="Enter Member Name"
              className="w-[100vh] outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
              style={{ height: "50px", fontSize: "15px" }}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label className="grid mt-5">
            Member Email
            <input
              type="email" 
              placeholder="Enter Member Email"
              className="w-[100vh] outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
              style={{ height: "50px", fontSize: "15px" }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="grid mt-5">
            Password
            <input
              type="password" 
              placeholder="Enter Member Password"
              className="w-[100vh] outline-none px-4 py-2 drop-shadow-md rounded-md mt-1"
              style={{ height: "50px", fontSize: "15px" }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <button
            className="rounded mt-10 bg-[#c93a0e] hover:bg-[#c91b0e]"
            style={{ width: "170px", height: "55px", color: "white" }}
            type="submit"
          >
            Save
          </button>
          <button
            type="button" 
            className="rounded mt-10 bg-black hover:bg-gray-800"
            style={{ width: "170px", height: "55px", color: "white", marginLeft: "30px" }}
            onClick={() => Navigate(-1)} 
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CMSAddMember;
