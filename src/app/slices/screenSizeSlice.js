import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenSize : "1440px"
}

const screenSizeSlice = createSlice({
    name: "screenSize",
    initialState,
    reducers : {
        laptopScreenSize : (state)=>{
            state.screenSize = "1440px"
        },
        tabletScreenSize : (state)=>{
            state.screenSize = "768px"
        },
        phoneScreenSize : (state)=>{
            state.screenSize = "375px"
        }
    }
})

export const {laptopScreenSize, tabletScreenSize, phoneScreenSize} = screenSizeSlice.actions

export default screenSizeSlice.reducer