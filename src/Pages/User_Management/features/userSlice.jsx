import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { toast,ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookie from "js-cookie";


const csrfToken = localStorage.getItem("csrftoken");





export const userDetails = createSlice({
  name: "userDetail",
  initialState: {},
  reducers: {
    dummy: (state) => state,
  },
  extraReducers: (builder) => {},
});

export default userDetails.reducer;
