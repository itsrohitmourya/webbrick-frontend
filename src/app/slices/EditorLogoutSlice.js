import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    islogout : false
}

const EditorLogoutSlice = createSlice({
    name: "EditorLogout",
    initialState,
    reducers : {
        resume : (state)=>{
            state.islogout = !state.islogout
        }
    }
})

export const { resume} = EditorLogoutSlice.actions
export default EditorLogoutSlice.reducer