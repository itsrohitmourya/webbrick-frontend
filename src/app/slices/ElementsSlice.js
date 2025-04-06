import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Elements : ''
}
const ElementsSlice = createSlice({
  name: "Elements",
  initialState,
  reducers: {
    getAllElements: (state) => state,
  },
});
export const { getAllElements } = ElementsSlice.actions;
export default ElementsSlice.reducer;
