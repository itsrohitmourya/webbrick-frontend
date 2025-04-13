import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  autoSave: false,
  autoSaveToolTip : false,
  manualSave : false
};
const autoSaveSlice = createSlice({
  name: "autoSave",
  initialState,
  reducers: {
   toggleAutoSave : (state)=>{
    state.autoSave = !state.autoSave;
   },
   toggleAutoSaveToolTip : (state)=>{
    state.autoSaveToolTip = !state.autoSaveToolTip
  },
  toggleManualSave : (state)=>{
    state.manualSave = !state.manualSave
  }
  },
});
export const { toggleAutoSave, toggleAutoSaveToolTip, toggleManualSave } = autoSaveSlice.actions;

export default autoSaveSlice.reducer;
