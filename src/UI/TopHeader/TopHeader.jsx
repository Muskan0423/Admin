import React,{useEffect} from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUserLogin } from "../../Pages/User_Management/features/userSlice";

const TopHeader = (props) => {
  const dispatch = useDispatch();
  const LuserData = useSelector((state) => state.userManagement.getUserLogin);
  useEffect(() => {
    dispatch(getUserLogin(localStorage.getItem('uid')))
  }, [dispatch])
  const name = LuserData.uname;
  const role = LuserData.role;
  const pic = LuserData.pic_url;
  const handleChange = (e) => {
    props.setTimeframe(e.target.value);
};

  return (
    <div
      className="ml-72 w-full h-20 fixed bg-white"
      style={{ marginLeft: "17.3rem", zIndex:"9" }}>
      <div className="ml-3 flex h-20 items-center justify-between">
        <div className="text-2xl font-semibold">{props.head}</div>
        {props.head=="Dashboard"?
        <div className="mt-5 mr-5" style={{marginLeft:530,marginBottom:30}}>
               
            </div>:null}
       
      </div>
    </div>
  );
};

export default TopHeader;
