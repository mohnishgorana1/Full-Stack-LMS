import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
};

export const getCourseLecture = createAsyncThunk(
  "course/lecture/get",
  async (cid) => {
    try {
      const res = await axios.get(`/api/v1/courses/${cid}`);
      console.log("res>> ", res);
      if (res.data.success) {
        toast.success("Courses Lectures fetched Successfully!");
        return (await res).data.lectures; // ab payload me sidha lectures jaenge
      } else {
        toast.error("No Lectures Found");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk("course/lecture/add", async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const res = await axios.post(`/api/v1/courses/${data.id}`, formData);
      console.log("res addcourselecture  >> ", res);

      if (res.data.success) {
        toast.success("Lectures added Successfully!");
        return (await res).data; // ab data me sidha course jaenga
      } else {
        toast.error("Failed to add Lectures");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload;
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
