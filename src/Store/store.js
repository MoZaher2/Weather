import { configureStore } from "@reduxjs/toolkit";
import weatherSliceReducer from "../StateSlices/weatherSlice";

export default configureStore({
  reducer: {
    weather: weatherSliceReducer,
  },
});