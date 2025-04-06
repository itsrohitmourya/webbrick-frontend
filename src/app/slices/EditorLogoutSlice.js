import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    islogout : false
}

const EditorLogoutSlice = createSlice({
    name: "EditorLogout",
    initialState,
    reducers : {
        logout : (state)=>{
            state.islogout = true
        },
        resume : (state)=>{
            state.islogout = false
        }
    }
})

export const {logout, resume} = EditorLogoutSlice.actions
export default EditorLogoutSlice.reducer