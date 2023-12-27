import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//     const res = axiosInstance.post("user/register", data);
//     console.log("res >>> ", res);
//     toast.promise(res, {
//       loading: "Wait! creating your account",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to create account",
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = await axios.post("/api/v1/user/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res >>> ", res);

    if (res.data.success) {
      toast.success("Account created successfully");
      console.log(res?.data?.message);
      return res?.data;
    } else {
      toast.error("Failed to create account");
    }
    return (await res).data;
  } catch (error) {
    toast.error("Error creating account", error);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await axios.post("/api/v1/user/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res >>> ", res);

    if (res.data.success) {
      toast.success("Logged in successfully");
      console.log(res?.data?.message);
      return res?.data; // (res?.data : {success, msg, user})
    } else {
      toast.error("Failed to login");
    }
    return (await res).data;
  } catch (error) {
    toast.error("Login request failed");
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = await axios.get("/api/v1/user/logout");
    console.log("res >>> ", res);

    if (res.data.success) {
      toast.success("Logged Out Successfully");
      console.log(res?.data?.message);
      return res?.data;
    } else {
      return (await res).data;
    }
  } catch (error) {
    toast.error("Logout request failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      (state.isLoggedIn = true),
        (state.data = action?.payload?.user),
        (state.role = action?.payload?.user?.role);
    });
    builder.addCase(logout.fulfilled, (state) => {
      // localStorage.setItem('data', {} )
      // localStorage.setItem('isLoggedIn', false )
      // localStorage.setItem('role', "")
      localStorage.clear();
      (state.isLoggedIn = false), (state.data = {}), (state.role = "");
    });
  },
});

// export const {} =authSlice.actions;
export default authSlice.reducer;
