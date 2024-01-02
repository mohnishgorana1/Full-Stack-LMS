import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/authSlice";
import courseSliceReducer from "./Slices/courseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import statSliceReducer from './Slices/StatSlice'

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    lecture: LectureSliceReducer,
    stat: statSliceReducer

  },
  devTools: true,
});

export default store;
