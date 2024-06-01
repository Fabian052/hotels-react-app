import { configureStore } from "@reduxjs/toolkit";
import hotels from "./states/Hotels.slice";

export default configureStore({
  reducer: {
    hotels,
  },
});
