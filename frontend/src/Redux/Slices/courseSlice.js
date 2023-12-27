import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { Form } from "react-router-dom";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const res = await axios.get("/api/v1/courses");
    console.log("res >>> ", res);
    if (res.data.success) {
      toast.success("Courses fetched Successfully");
      console.log(res?.data?.message);
      return (await res).data.course; // ab data me sidha courses jaenge
    } else {
      toast.error("No Course Found");
    }
  } catch (error) {
    toast.error("Error Fetching Courses");
  }
});

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);



    const res = await axios.post("/api/v1/courses", formData);
    console.log("res >>> ", res);
    if (res.data.success) {
      toast.success("Courses created Successfully");
      console.log(res?.data?.message);
      return (await res).data;
    } else {
      toast.error("Can't create course");
    }
  } catch (error) {
    toast.error("Error Creating Courses");
    console.log(error);
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.courseData = [...action.payload];
      }
    });
  },
});

// export {} = courseSlice.actions()
export default courseSlice.reducer;
