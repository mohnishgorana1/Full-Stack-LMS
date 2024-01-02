import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/authSlice";
import courseSliceReducer from "./Slices/courseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: LectureSliceReducer,
  },
  devTools: true,
});

export default store;
