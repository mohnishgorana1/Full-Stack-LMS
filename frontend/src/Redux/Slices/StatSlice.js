import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
};

export const getStatsData = createAsyncThunk("/stats/get", async () => {
  try {
    const res = await axios.get("/admin/stats/users");
    console.log("res getStatsData >> ", res);
    if (res?.data?.success) {
      toast.success("User Stats Fetched Successfully !");
      return (await res).data; // isme allUsersCount or subscribedUsersCount milenge
    }else{
        toast.error('Could not fetched userStats')
        return
    }
  } catch (error) {
    toast.error("API ERROR! Error fetching stats");
    return;
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount;
      state.subscribedCount = action?.payload?.subscribedUsersCount;
    });
  },
});

export default statSlice.reducer;
