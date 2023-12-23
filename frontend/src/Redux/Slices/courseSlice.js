import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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
      return (await res).data.course;  // ab data me sidha courses jaenge
    } else {
      toast.error('No Course Found')
    }
  } catch (error) {
    toast.error("Error Fetching Courses");
  }
});

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
        if(action.payload){
            state.courseData = [...action.payload]
        }
    })
  },
});

// export {} = courseSlice.actions()
export default courseSlice.reducer;
