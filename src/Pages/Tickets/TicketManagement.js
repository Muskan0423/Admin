import React, { useEffect, useState } from "react";
import TopHeader from "../../UI/TopHeader/TopHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import Table from "../../UI/CommonTable/Table";

const TicketManagement = ({ setActiveTab, setExpand }) => {
  setExpand("userManagement");
  setActiveTab("allUsers");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [dept, setDept] = useState("")
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
   

const [loading,setLoading]=useState()
  const head = "TicketManagement";
  const navigate = useNavigate();
  const columns = [
    {
      header: "Picture",
      accessor: "pic",
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "User Type",
      accessor: "user_type",
    },
    {
      header: "Action",
      accessor: "action",
    },
  ];


//   const sampledata = filteredData.map((item, index) => ({
//     name: item.uname,
//     pic: <ProfilePhoto picUrl={item.pic_url} />,
//     user_type: item.user_type,
//     action: <Action uid={item.uid} uname={item.uname} deptData={data.deptData} setLoading={setLoading} />
//   }))

  const pageSize = 5;



  return (
    <div>
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
      <div>
        <TopHeader className="fixed" head={head} />
      </div>

      <div className="ml-80 relative bg-[#EEEEEE] p-5 rounded-md drop-shadow-md borders w-[70vw] " style={{ marginTop: "120px" }}>
      <Table
              columns={columns}
            
              pageSize={pageSize}
            />
      </div>
    </div>
  );
};

export default TicketManagement;
