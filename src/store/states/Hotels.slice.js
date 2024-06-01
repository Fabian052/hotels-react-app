import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const HotelsSlice = createSlice({
  name: "hotels",
  initialState: null,
  reducers: {
    setHotels: (state, action) => action.payload,
  },
});

export const { setHotels } = HotelsSlice.actions;

export default HotelsSlice.reducer;

export const getHotelsThunk = (url) => (dispatch) => {
  axios
    .get(url)
    .then((res) => dispatch(setHotels(res.data)))
    .catch((err) => console.log(err));
};
