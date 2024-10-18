import React, { useEffect, useState } from 'react';
import Card from "./Component/Card";
import { Book, Dollar, Headset, Users } from "./Assets";
import TopHeader from "../../UI/TopHeader/TopHeader";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('today');
  const head = "Dashboard";
  const [data, setData] = useState(null);
  
  const apiUrl = 'http://localhost:5000';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/admin/tasks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token retrieval as needed
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [timeframe]);

  return (
    <div className='container'>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} setTimeframe={setTimeframe} timeframe={timeframe}/>
      </div>
      <div className="ml-72 mt-32 w-[80%] relative">
        <div className="flex flex-wrap justify-between mt-5 mx-4 sm:justify-start text-white">
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 px-2 mb-4">
            <Card
              title={data?.totalUsers}
              subtitle={"Total Users"}
              icon={Dollar}
              color={"bg-[#4EA2EF]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 px-2 mb-4">
            <Card
              title={data?.pendingTasks}
              subtitle={"Pending Tasks"}
              icon={Book}
              color={"bg-[#19398B]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 px-2 mb-4">
            <Card
              title={data?.fulfilledTasks}
              subtitle={"Fulfilled Tasks"}
              icon={Headset}
              color={"bg-[#E9B84A]"}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-1/4 px-2 mb-4">
            <Card
              title={data?.totalTasks}
              subtitle={"Total Tasks"}
              icon={Users}
              color={"bg-[#FFA843]"}
            />
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Dashboard;
