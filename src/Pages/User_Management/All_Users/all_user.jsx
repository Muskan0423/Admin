import React, { useState, useEffect } from "react";
import Table from "../../../UI/CommonTable/Table";
import TopHeader from "../../../UI/TopHeader/TopHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "react-loader-spinner";

// Component inside action column


const ProfilePhoto = ({ picUrl }) => {
  return (
    <div>
      <img className="w-12 h-12 rounded-full" style={{ objectFit: 'cover' }} src={picUrl} alt="photo" />
    </div>
  );
};

const Allmembers = ({ setActiveTab, setExpand }) => {
  const head = "All Users";
  setExpand("userManagement");
  setActiveTab("allUsers");
  const Navigate = useNavigate();
  const greenClicked = () => {
    Navigate("/home/createUser", { state: deptData });
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userManagement.users);
  const deptData = useSelector((state) => state.userManagement.getAllDepartments_cms);
  const [loading, setLoading] = useState(true);



 

  const pageSize = 5;
  const greenButtonText = "Add User";
  const filteredData = userData.filter((user) => user.is_suspend === 0);





  return (
    <div>
      <div className="flex fixed z-10">
        <TopHeader className="fixed" head={head} />
      </div>

      {loading ? (
        <div className="fixed inset-0 bg-gray-700 opacity-80 flex justify-center items-center z-50">
          <Grid
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <div className=" ml-72 w-[75vw] relative" style={{ marginTop: "70px" }}>
       
      </div>
    </div>
  );
};

export default Allmembers;
